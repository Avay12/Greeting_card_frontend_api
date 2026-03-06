"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Play, Pause, Square, Music2, Trash2, Check, Volume2, Upload, Loader2,
} from "lucide-react";
import { DEFAULT_TRACKS, MusicTrack } from "@/lib/data/defaultTracks";
import api from "@/lib/api";

interface AudioPickerProps {
  value: string | null;
  trackName?: string;
  onChange: (audioUrl: string | null, trackName?: string) => void;
}

type Tab = "record" | "music";

// ─── Waveform ─────────────────────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${active ? "bg-primary" : "bg-muted-foreground/40"}`}
          animate={active ? { height: ["4px", `${8 + Math.sin(i) * 8}px`, "4px"] } : { height: "4px" }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

// ─── AudioPlayerBar (exported for Demo + Preview pages) ──────────────────────
export function AudioPlayerBar({
  src,
  label,
  autoPlay = false,
}: {
  src: string;
  label?: string;
  autoPlay?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);

  // Auto-play when mounted (if requested), 600ms delay for modal animation
  useEffect(() => {
    if (!autoPlay || !audioRef.current) return;
    const audio = audioRef.current;
    const timer = setTimeout(() => {
      audio.play()
        .then(() => { setPlaying(true); setAutoPlayBlocked(false); })
        .catch(() => setAutoPlayBlocked(true)); // browser policy blocked it
    }, 600);
    return () => clearTimeout(timer);
  }, [autoPlay, src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => { setPlaying(true); setAutoPlayBlocked(false); })
        .catch(() => setAudioError(true));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => setPlaying(false);
    const onTime = () => setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    const onError = () => { setAudioError(true); setPlaying(false); };
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  // Reset error state when src changes
  useEffect(() => {
    setAudioError(false);
    setPlaying(false);
    setProgress(0);
  }, [src]);

  if (audioError) {
    return (
      <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl px-5 py-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 flex-shrink-0">
          <Volume2 className="w-4 h-4 text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400">Audio unavailable</p>
          <p className="text-[11px] text-red-400 dark:text-red-500 truncate">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-3 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all flex-shrink-0"
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground truncate">{label || "Audio Message"}</p>
        {autoPlayBlocked ? (
          <p className="text-[11px] text-amber-500 mt-0.5">▶ Press play to start</p>
        ) : (
          <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <Waveform active={playing} />
    </div>
  );
}

// ─── Main AudioPicker ─────────────────────────────────────────────────────────
export default function AudioPicker({ value, trackName, onChange }: AudioPickerProps) {
  const [tab, setTab] = useState<Tab>("record");

  // Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Music
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const requestMic = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
    } catch {
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "record" && hasPermission === null) requestMic();
  }, [tab, hasPermission, requestMic]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setLocalBlobUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      setUploadError(null);
    } catch {
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Upload blob to backend → get persistent URL
  const uploadAndUse = async () => {
    if (!recordedBlob) return;
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("audio", recordedBlob, "recording.webm");
      const res = await api.post("/uploads/audio", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const serverUrl: string = res.data.url;
      // Backend returns relative path like /uploads/audio/xxx.webm
      // Prefix with backend base URL so it's always accessible
      const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"}${serverUrl}`;
      onChange(fullUrl, "🎙️ Voice Recording");
    } catch (err: any) {
      setUploadError(err?.response?.data?.error || "Upload failed. Using local session version.");
      // Fallback: use blob URL for this session
      if (localBlobUrl) onChange(localBlobUrl, "🎙️ Voice Recording");
    } finally {
      setUploading(false);
    }
  };

  const clearAudio = () => {
    setRecordedBlob(null);
    setLocalBlobUrl(null);
    onChange(null, undefined);
  };

  const togglePreview = (track: MusicTrack) => {
    if (previewingId === track.id) {
      previewAudioRef.current?.pause();
      setPreviewingId(null);
      return;
    }
    previewAudioRef.current?.pause();
    const audio = new Audio(track.url);
    audio.volume = 0.4;
    audio.play().catch(() => {});
    audio.onended = () => setPreviewingId(null);
    previewAudioRef.current = audio;
    setPreviewingId(track.id);
  };

  const selectTrack = (track: MusicTrack) => {
    previewAudioRef.current?.pause();
    setPreviewingId(null);
    onChange(track.url, `${track.emoji} ${track.name}`);
  };

  useEffect(() => () => { previewAudioRef.current?.pause(); }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Volume2 className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Audio</p>
          <p className="text-[11px] text-muted-foreground">Add a voice message or background music</p>
        </div>
        {value && (
          <button onClick={clearAudio} className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected audio preview */}
      {value && <AudioPlayerBar src={value} label={trackName || "Selected Audio"} />}

      {/* Tabs */}
      <div className="flex bg-muted p-1 rounded-xl w-full">
        {(["record", "music"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${tab === t ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t === "record" ? <Mic className="w-3.5 h-3.5" /> : <Music2 className="w-3.5 h-3.5" />}
            {t === "record" ? "Record Voice" : "Default Music"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── RECORD TAB ── */}
        {tab === "record" && (
          <motion.div key="record" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            {hasPermission === false ? (
              <div className="p-5 bg-destructive/10 rounded-2xl text-center text-sm text-destructive font-medium space-y-2">
                <MicOff className="w-6 h-6 mx-auto" />
                <p>Microphone permission denied.</p>
                <button onClick={requestMic} className="text-xs underline text-destructive/70">Try again</button>
              </div>
            ) : (
              <div className="p-5 bg-muted/50 rounded-2xl space-y-4 border border-border">
                <div className="flex items-center justify-center gap-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                    >
                      <Mic className="w-4 h-4" />
                      {localBlobUrl ? "Re-record" : "Start Recording"}
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-colors animate-pulse"
                    >
                      <Square className="w-4 h-4 fill-white" /> Stop
                    </button>
                  )}
                  <Waveform active={isRecording} />
                </div>

                {localBlobUrl && !isRecording && (
                  <div className="space-y-3 pt-2 border-t border-border">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Your Recording</p>
                    <audio src={localBlobUrl} className="w-full rounded-xl" controls />

                    {uploadError && (
                      <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg">
                        ⚠️ {uploadError}
                      </p>
                    )}

                    <button
                      onClick={uploadAndUse}
                      disabled={uploading || value?.includes("/uploads/")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors"
                    >
                      {uploading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                      ) : value?.includes("/uploads/") ? (
                        <><Check className="w-4 h-4" /> Saved & Ready</>
                      ) : (
                        <><Upload className="w-4 h-4" /> Save & Use Recording</>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground/60">
                      Saving uploads the recording to the server so it works in shared links.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ── MUSIC TAB ── */}
        {tab === "music" && (
          <motion.div key="music" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-2">
            {DEFAULT_TRACKS.map((track) => {
              const isSelected = value === track.url;
              const isPreviewing = previewingId === track.id;
              return (
                <div
                  key={track.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"}`}
                >
                  <div className="text-2xl w-10 text-center flex-shrink-0">{track.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{track.name}</p>
                    <p className="text-[11px] text-muted-foreground">{track.mood}</p>
                  </div>
                  <button onClick={() => togglePreview(track)} className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    {isPreviewing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => selectTrack(track)} className={`p-2 rounded-xl transition-colors ${isSelected ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            <p className="text-[10px] text-muted-foreground/60 text-center pt-1">
              Music by Bensound.com — free for non-commercial use
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
