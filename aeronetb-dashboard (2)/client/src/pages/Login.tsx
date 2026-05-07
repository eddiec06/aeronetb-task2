/**
 * Login Page — AeroNetB Dashboard
 * Design: Centered card on slate-100 background, blue primary button
 */
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Plane } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const roles: UserRole[] = ["Admin", "Manager", "Auditor"];

export default function Login() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole>("Admin");

  const handleLogin = () => {
    login(selectedRole);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-600 flex items-center justify-center shadow-md mb-4">
            <Plane className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">AeroNetB Login</h1>
          <p className="text-sm text-slate-500 mt-1">Task 2 Dashboard — Student Project</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1.5">
              Choose your access level to continue.
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150 shadow-sm"
          >
            Login as {selectedRole}
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          AeroNetB · Hybrid SQL + MongoDB Prototype · University Coursework
        </p>
      </div>
    </div>
  );
}
