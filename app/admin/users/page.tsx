"use client";

import { useEffect } from "react";
import { useAdminDataStore } from "@/store/adminDataStore";
import { Users, Loader2, Shield, User } from "lucide-react";

export default function AdminUsersPage() {
  const { users, fetchUsers, isLoading, error } = useAdminDataStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-heading">
            Users
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage all registered users on the platform.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <Users className="w-5 h-5" />
          {users.length} Total Users
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-destructive bg-destructive/10">
            {error}
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${user.role === "admin" ? "bg-purple-500/10 text-purple-500" : "bg-muted text-muted-foreground"}`}
                      >
                        {user.role === "admin" ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
