"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Realistic Snowflake — Canvas ─────────────────────────────────────────────
function SnowScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw a single 6-arm snowflake crystal
    function drawFlake(
      x: number,
      y: number,
      size: number,
      rotation: number,
      alpha: number
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#e8f4fd";
      ctx.lineWidth = Math.max(0.5, size * 0.06);
      ctx.lineCap = "round";

      for (let arm = 0; arm < 6; arm++) {
        ctx.save();
        ctx.rotate((arm * Math.PI) / 3);

        // Main arm
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.stroke();

        // Branches at 60% and 85% of arm length
        for (const frac of [0.6, 0.85]) {
          const branchLen = size * frac * 0.38;
          for (const side of [-1, 1]) {
            ctx.save();
            ctx.translate(0, -size * frac);
            ctx.rotate(side * (Math.PI / 3));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -branchLen);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Tip hexagon dot
        ctx.beginPath();
        ctx.arc(0, -size, size * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = "#c8e6fa";
        ctx.fill();

        ctx.restore();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "#e8f4fd";
      ctx.globalAlpha = alpha;
      ctx.fill();

      ctx.restore();
    }

    // Flake particle
    interface Flake {
      x: number; y: number;
      size: number; speed: number;
      drift: number; driftSpeed: number;
      driftAngle: number;
      rotation: number; rotSpeed: number;
      alpha: number;
    }

    const count = 60;
    const flakes: Flake[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,   // start spread across screen
      size: 5 + Math.random() * 14,
      speed: 0.4 + Math.random() * 0.8,
      drift: 0,
      driftSpeed: 0.005 + Math.random() * 0.01,
      driftAngle: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      alpha: 0.5 + Math.random() * 0.5,
    }));

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const f of flakes) {
        f.driftAngle += f.driftSpeed;
        f.drift = Math.sin(f.driftAngle) * 0.8;
        f.x += f.drift;
        f.y += f.speed;
        f.rotation += f.rotSpeed;

        if (f.y > canvas.height + 30) {
          f.y = -30;
          f.x = Math.random() * canvas.width;
        }

        drawFlake(f.x, f.y, f.size, f.rotation, f.alpha);
      }

      animId = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Confetti Cannon — Canvas ─────────────────────────────────────────────────
function CelebrationScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "#ff595e","#ffca3a","#6a4c93","#1982c4","#8ac926",
      "#ff9ff3","#54a0ff","#ff6b6b","#ffd93d","#c44dff",
      "#00d2d3","#ff9f43","#ee5a24","#0652DD","#F9CA24",
    ];
    type Shape = "rect" | "circle" | "ribbon";

    interface Piece {
      x: number; y: number; vx: number; vy: number;
      w: number; h: number; color: string; shape: Shape;
      rotation: number; rotVel: number;
      flipAngle: number; flipSpeed: number;
      gravity: number; drag: number; opacity: number;
      // cannon origin for respawn
      side: "left" | "right" | "top";
    }

    function makePiece(side: "left" | "right" | "top"): Piece {
      const shape: Shape = (["rect","rect","circle","ribbon","rect"] as Shape[])[Math.floor(Math.random()*5)];
      const w = shape === "ribbon" ? 4+Math.random()*4 : 7+Math.random()*12;
      const h = shape === "ribbon" ? 16+Math.random()*10 : 7+Math.random()*12;

      // Cannon positions
      let sx = 0, sy = 0, svx = 0, svy = 0;
      if (side === "left") {
        sx = -10;
        sy = canvas.height * (0.55 + Math.random() * 0.2);
        svx = 8 + Math.random() * 10;     // blast right
        svy = -(10 + Math.random() * 12); // blast upward
      } else if (side === "right") {
        sx = canvas.width + 10;
        sy = canvas.height * (0.55 + Math.random() * 0.2);
        svx = -(8 + Math.random() * 10);  // blast left
        svy = -(10 + Math.random() * 12);
      } else {
        // top falling
        sx = Math.random() * canvas.width;
        sy = -20;
        svx = (Math.random() - 0.5) * 2;
        svy = 1.5 + Math.random() * 2;
      }

      return {
        x: sx, y: sy, vx: svx, vy: svy,
        w, h,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape,
        rotation: Math.random() * Math.PI * 2,
        rotVel: (Math.random() - 0.5) * 0.2,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: 0.05 + Math.random() * 0.1,
        gravity: 0.18 + Math.random() * 0.12,
        drag: 0.988,
        opacity: 0.9 + Math.random() * 0.1,
        side,
      };
    }

    // 50 from each cannon + 30 from top
    const pieces: Piece[] = [
      ...Array.from({ length: 50 }, () => makePiece("left")),
      ...Array.from({ length: 50 }, () => makePiece("right")),
      ...Array.from({ length: 30 }, () => { const p = makePiece("top"); p.y = -Math.random()*canvas.height*0.8; return p; }),
    ];

    function drawPiece(p: Piece) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const sy = Math.abs(Math.cos(p.flipAngle));
      ctx.scale(1, sy < 0.05 ? 0.05 : sy);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath(); ctx.arc(0, 0, p.w/2, 0, Math.PI*2); ctx.fill();
      } else if (p.shape === "ribbon") {
        ctx.beginPath();
        ctx.moveTo(-p.w/2, -p.h/2);
        ctx.bezierCurveTo(p.w, -p.h/4, -p.w, p.h/4, p.w/2, p.h/2);
        ctx.bezierCurveTo(-p.w, p.h/4, p.w, -p.h/4, -p.w/2, -p.h/2);
        ctx.fill();
      } else {
        const r=2, hw=p.w/2, hh=p.h/2;
        ctx.beginPath();
        ctx.moveTo(-hw+r,-hh); ctx.lineTo(hw-r,-hh); ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
        ctx.lineTo(hw,hh-r); ctx.quadraticCurveTo(hw,hh,hw-r,hh);
        ctx.lineTo(-hw+r,hh); ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
        ctx.lineTo(-hw,-hh+r); ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
        ctx.fill();
        ctx.globalAlpha = p.opacity*0.35; ctx.fillStyle="#fff";
        ctx.fillRect(-hw,-hh,p.w*0.4,p.h);
      }
      ctx.restore();
    }

    // Periodic re-burst: every 3 seconds re-launch left+right cannons
    const burst = setInterval(() => {
      pieces.slice(0,100).forEach((p,i)=>{
        const side = i < 50 ? "left" : "right";
        const fresh = makePiece(side);
        Object.assign(p, fresh);
      });
    }, 3000);

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.vy += p.gravity;
        p.vx *= p.drag; p.vy *= p.drag;
        p.vx += (Math.random()-0.5)*0.06;
        p.x += p.vx; p.y += p.vy;
        p.rotation += p.rotVel;
        p.flipAngle += p.flipSpeed;

        const offBottom = p.y > canvas.height + 40;
        const offSide = p.x < -60 || p.x > canvas.width + 60;
        if (offBottom || offSide) {
          const fresh = makePiece(p.side);
          // stagger respawn so they don't all arrive together
          fresh.x = p.side === "left" ? -10 : p.side === "right" ? canvas.width+10 : Math.random()*canvas.width;
          fresh.y = p.side === "top" ? -20 : canvas.height*(0.55+Math.random()*0.2);
          Object.assign(p, fresh);
        }
        drawPiece(p);
      }
      animId = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(animId); clearInterval(burst); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Other scenes (framer-motion) ─────────────────────────────────────────────

// ─── Rose Petal Cannon — Canvas ───────────────────────────────────────────────
function RosePetalScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const PETAL_COLORS = ["#ff2d55","#ff6b8a","#c9184a","#ff8fa3","#ffb3c1","#ff4d6d","#a10035","#ff94b0"];

    function drawPetal(x:number,y:number,size:number,rot:number,color:string,alpha:number,scaleY:number) {
      ctx.save();
      ctx.translate(x,y);
      ctx.rotate(rot);
      ctx.scale(1, scaleY < 0.05 ? 0.05 : scaleY);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      // Organic heart-petal shape using beziers
      ctx.beginPath();
      ctx.moveTo(0, size*0.5);
      ctx.bezierCurveTo(-size*0.9, size*0.1, -size*0.6, -size*0.8, 0, -size*0.4);
      ctx.bezierCurveTo(size*0.6, -size*0.8, size*0.9, size*0.1, 0, size*0.5);
      ctx.fill();

      // Petal vein
      ctx.strokeStyle = `${color}88`;
      ctx.lineWidth = size * 0.04;
      ctx.beginPath();
      ctx.moveTo(0, size*0.5);
      ctx.quadraticCurveTo(0, 0, 0, -size*0.4);
      ctx.stroke();
      ctx.restore();
    }

    interface Petal {
      x:number;y:number;vx:number;vy:number;
      size:number;color:string;rotation:number;rotVel:number;
      flipAngle:number;flipSpeed:number;
      gravity:number;drag:number;opacity:number;
      side:"left"|"right"|"top";
    }

    function makePetal(side:"left"|"right"|"top"): Petal {
      let sx=0,sy=0,svx=0,svy=0;
      if (side==="left") {
        sx=-10; sy=canvas.height*(0.5+Math.random()*0.25);
        svx=6+Math.random()*9; svy=-(8+Math.random()*10);
      } else if (side==="right") {
        sx=canvas.width+10; sy=canvas.height*(0.5+Math.random()*0.25);
        svx=-(6+Math.random()*9); svy=-(8+Math.random()*10);
      } else {
        sx=Math.random()*canvas.width; sy=-20;
        svx=(Math.random()-0.5)*1.5; svy=0.8+Math.random()*1.5;
      }
      return {
        x:sx,y:sy,vx:svx,vy:svy,
        size:10+Math.random()*18,
        color:PETAL_COLORS[Math.floor(Math.random()*PETAL_COLORS.length)],
        rotation:Math.random()*Math.PI*2,
        rotVel:(Math.random()-0.5)*0.04,
        flipAngle:Math.random()*Math.PI*2,
        flipSpeed:0.025+Math.random()*0.05,
        gravity:0.1+Math.random()*0.08,
        drag:0.992,
        opacity:0.8+Math.random()*0.2,
        side,
      };
    }

    const petals: Petal[] = [
      ...Array.from({length:40},()=>makePetal("left")),
      ...Array.from({length:40},()=>makePetal("right")),
      ...Array.from({length:20},()=>{ const p=makePetal("top"); p.y=-Math.random()*canvas.height*0.8; return p; }),
    ];

    const burst = setInterval(() => {
      petals.slice(0,80).forEach((p,i)=>{
        Object.assign(p, makePetal(i<40?"left":"right"));
      });
    }, 3200);

    function tick() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (const p of petals) {
        p.vy+=p.gravity; p.vx*=p.drag; p.vy*=p.drag;
        p.vx+=(Math.random()-0.5)*0.04;
        p.x+=p.vx; p.y+=p.vy;
        p.rotation+=p.rotVel; p.flipAngle+=p.flipSpeed;

        if (p.y>canvas.height+40 || p.x<-60 || p.x>canvas.width+60) {
          Object.assign(p, makePetal(p.side));
        }
        drawPetal(p.x,p.y,p.size,p.rotation,p.color,p.opacity,Math.abs(Math.cos(p.flipAngle)));
      }
      animId=requestAnimationFrame(tick);
    }
    tick();
    return ()=>{ cancelAnimationFrame(animId); clearInterval(burst); window.removeEventListener("resize",resize); };
  },[]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function FireflyScene() {
  const flies = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: 4+Math.random()*8, hue: 120+Math.random()*120,
    delay: Math.random()*6, duration: 4+Math.random()*6,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_,i) => (
        <motion.div key={`aurora-${i}`} className="absolute inset-x-0"
          style={{ top:`${20+i*20}%`, height:"200px",
            background:`linear-gradient(90deg,transparent,hsl(${160+i*30},80%,60%,0.15),transparent)`,
            filter:"blur(40px)" }}
          animate={{ x:["-30%","30%","-30%"], opacity:[0.3,0.7,0.3] }}
          transition={{ duration:8+i*2, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
      {flies.map((f) => (
        <motion.div key={f.id} className="absolute rounded-full"
          style={{ left:`${f.x}%`, top:`${f.y}%`, width:f.size, height:f.size,
            backgroundColor:`hsl(${f.hue},80%,70%)`,
            boxShadow:`0 0 ${f.size*3}px hsl(${f.hue},80%,70%)` }}
          animate={{ x:[0,30,-30,15,0], y:[0,-30,15,-15,0], opacity:[0,1,0.5,1,0] }}
          transition={{ duration:f.duration, delay:f.delay, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}

function BlossomScene() {
  const petals = Array.from({ length: 50 }, (_, i) => ({
    id: i, x: Math.random()*100, size: 8+Math.random()*12,
    delay: Math.random()*12, duration: 8+Math.random()*6,
    drift: (Math.random()-0.5)*100, rotation: Math.random()*360,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <motion.div key={p.id}
          style={{ position:"absolute", left:`${p.x}%`, top:"-30px", fontSize:p.size*2,
            filter:"drop-shadow(0 2px 4px rgba(255,100,150,0.3))" }}
          animate={{ y:["0vh","110vh"], x:[0,p.drift], rotate:[p.rotation,p.rotation+180], opacity:[0,1,0.8,0] }}
          transition={{ duration:p.duration, delay:p.delay, repeat:Infinity, ease:"linear" }}
        >🌸</motion.div>
      ))}
    </div>
  );
}

function GalaxyScene() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: 1+Math.random()*3, delay: Math.random()*4, duration: 2+Math.random()*3,
  }));
  const shooters = Array.from({ length: 5 }, (_, i) => ({
    id: i, x: Math.random()*60, y: Math.random()*40, delay: i*4+Math.random()*3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full bg-white"
          style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size }}
          animate={{ opacity:[0.1,1,0.1], scale:[0.8,1.2,0.8] }}
          transition={{ duration:s.duration, delay:s.delay, repeat:Infinity }}
        />
      ))}
      {shooters.map((s) => (
        <motion.div key={s.id} className="absolute h-px"
          style={{ left:`${s.x}%`, top:`${s.y}%`,
            background:"linear-gradient(90deg,transparent,white,transparent)",
            width:100, transformOrigin:"left center" }}
          animate={{ x:[0,300], y:[0,100], opacity:[0,1,0], rotate:[35,35] }}
          transition={{ duration:1.5, delay:s.delay, repeat:Infinity, repeatDelay:8 }}
        />
      ))}
    </div>
  );
}

function RomanceScene() {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random()*100, size: 14+Math.random()*24,
    delay: Math.random()*10, duration: 6+Math.random()*8,
    drift: (Math.random()-0.5)*60, opacity: 0.4+Math.random()*0.6,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/10 to-purple-900/20" />
      {hearts.map((h) => (
        <motion.div key={h.id}
          style={{ position:"absolute", left:`${h.x}%`, bottom:"-40px", fontSize:h.size, opacity:h.opacity }}
          animate={{ y:["0vh","-110vh"], x:[0,h.drift,0], rotate:[0,15,-15,0] }}
          transition={{ duration:h.duration, delay:h.delay, repeat:Infinity, ease:"easeOut" }}
        >❤️</motion.div>
      ))}
    </div>
  );
}

function ForestScene() {
  const leaves = Array.from({ length: 35 }, (_, i) => ({
    id: i, x: Math.random()*100, size: 16+Math.random()*20,
    delay: Math.random()*12, duration: 8+Math.random()*8,
    drift: (Math.random()-0.5)*150, emoji: ["🍃","🍂","🌿","🍁"][i%4],
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((l) => (
        <motion.div key={l.id}
          style={{ position:"absolute", left:`${l.x}%`, top:"-40px", fontSize:l.size }}
          animate={{ y:["0vh","110vh"], x:[0,l.drift,l.drift*0.5,0],
            rotate:[0,180,360], opacity:[0,1,1,0] }}
          transition={{ duration:l.duration, delay:l.delay, repeat:Infinity, ease:"linear" }}
        >{l.emoji}</motion.div>
      ))}
    </div>
  );
}

function GoldenScene() {
  const sparks = Array.from({ length: 50 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: 3+Math.random()*8, delay: Math.random()*5, duration: 2+Math.random()*4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s) => (
        <motion.div key={s.id}
          style={{ position:"absolute", left:`${s.x}%`, top:`${s.y}%`, fontSize:s.size*3 }}
          animate={{ scale:[0,1.5,0], opacity:[0,1,0], rotate:[0,180] }}
          transition={{ duration:s.duration, delay:s.delay, repeat:Infinity }}
        >✨</motion.div>
      ))}
    </div>
  );
}

// ─── Scene Registry ───────────────────────────────────────────────────────────
export type SceneType =
  | "none" | "snow" | "roses" | "celebration" | "blossom"
  | "galaxy" | "firefly" | "romance" | "forest" | "golden";

export function SceneBackground({ type }: { type: SceneType }) {
  switch (type) {
    case "snow":        return <SnowScene />;
    case "roses":       return <RosePetalScene />;
    case "celebration": return <CelebrationScene />;
    case "blossom":     return <BlossomScene />;
    case "galaxy":      return <GalaxyScene />;
    case "firefly":     return <FireflyScene />;
    case "romance":     return <RomanceScene />;
    case "forest":      return <ForestScene />;
    case "golden":      return <GoldenScene />;
    default:            return null;
  }
}
