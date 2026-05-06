/**
 * DashboardLayout — AeroNetB Student Dashboard
 * Design: Dark slate-800 sidebar + light main area
 * Sidebar items: Dashboard, Suppliers, Shipments, Quality Control, IoT Monitoring
 */
import { useAuth } from "@/contexts/AuthContext";
import {
  Activity,
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  LogOut,
  Menu,
  Package,
  Plane,
  Search,
  SettingsIcon,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "Dashboard",       path: "/dashboard",       icon: BarChart3 },
  { label: "Orders",         path: "/orders",         icon: ShoppingCart },
  { label: "Suppliers",       path: "/suppliers",       icon: Package },
  { label: "Shipments",       path: "/shipments",       icon: Truck },
  { label: "Quality Control", path: "/quality-control", icon: ClipboardCheck },
  { label: "IoT Monitoring",  path: "/iot-monitoring",  icon: Activity },
  { label: "Settings",        path: "/settings",        icon: SettingsIcon },
];

interface Props {
  children: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  pageTitle: string;
}

export default function DashboardLayout({
  children,
  searchValue = "",
  onSearchChange,
  pageTitle,
}: Props) {
  const { role, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleBadgeColor: Record<string, string> = {
    Admin:   "bg-slate-200 text-slate-800",
    Manager: "bg-green-100 text-green-800",
    Auditor: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="h-screen flex bg-background">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-60 z-30 flex flex-col
          bg-sidebar text-sidebar-foreground
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:h-screen
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight text-white">AeroNetB</p>
            <p className="text-[10px] text-slate-400 leading-tight">Task 2 Dashboard</p>
          </div>
          <button
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-sidebar-border">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Logged in as</p>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${roleBadgeColor[role]}`}>
            {role}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = location === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${active
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-600 hover:text-white"
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-base font-semibold text-slate-800 truncate">{pageTitle}</h1>

          {onSearchChange && (
            <div className="ml-auto flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 w-56 lg:w-72">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search…"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1 min-w-0"
              />
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
