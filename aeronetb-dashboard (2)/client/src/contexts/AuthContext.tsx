import React, { createContext, useContext, useState } from "react";

export type UserRole = "Admin" | "Manager" | "Auditor";

interface AuthContextValue {
  isLoggedIn: boolean;
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>("Admin");

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole("Admin");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
