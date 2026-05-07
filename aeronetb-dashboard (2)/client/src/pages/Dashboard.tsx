/**
 * Dashboard Page — AeroNetB
 * Design: KPI cards with left-border accents, API endpoint list, DB status card
 */
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Activity,
  CheckCircle,
  ClipboardList,
  Code2,
  Database,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";

const kpiCards = [
  {
    label: "Total Suppliers",
    value: "24",
    icon: Package,
    borderColor: "border-l-slate-500",
    iconBg: "bg-slate-50 text-slate-600",
  },
  {
    label: "Active Orders",
    value: "18",
    icon: ShoppingCart,
    borderColor: "border-l-slate-400",
    iconBg: "bg-slate-50 text-slate-500",
  },
  {
    label: "Pending Shipments",
    value: "7",
    icon: Truck,
    borderColor: "border-l-amber-500",
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    label: "QC Reports",
    value: "42",
    icon: ClipboardList,
    borderColor: "border-l-slate-300",
    iconBg: "bg-slate-50 text-slate-400",
  },
];

const apiEndpoints = [
  { path: "/api/orders",      method: "GET",  desc: "Retrieve all orders" },
  { path: "/api/suppliers",   method: "GET",  desc: "List all suppliers" },
  { path: "/api/shipments",   method: "GET",  desc: "Shipment tracking data" },
  { path: "/api/qc-reports",  method: "GET",  desc: "Quality control reports" },
  { path: "/api/iot-logs",    method: "GET",  desc: "IoT sensor log entries" },
];

const methodColor: Record<string, string> = {
  GET:    "bg-green-100 text-green-700",
  POST:   "bg-slate-100 text-slate-700",
  DELETE: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const { role } = useAuth();
  const [search, setSearch] = useState("");

  const roleBadge: Record<string, string> = {
    Admin:   "bg-blue-100 text-blue-800",
    Manager: "bg-green-100 text-green-800",
    Auditor: "bg-amber-100 text-amber-800",
  };

  return (
    <DashboardLayout
      pageTitle="AeroNetB Task 2 Dashboard"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Welcome banner */}
      <div className="bg-slate-600 rounded-xl p-5 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg">Welcome to AeroNetB</h2>
          <p className="text-slate-100 text-sm mt-0.5">
            Hybrid SQL + MongoDB operational dashboard — Task 2 Prototype
          </p>
        </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-slate-200 text-slate-800`}>
          Role: {role}
        </span>
      </div>

      {/* KPI Cards */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map(({ label, value, icon: Icon, borderColor, iconBg }) => (
            <div
              key={label}
              className={`bg-card rounded-xl shadow-sm border border-border border-l-4 ${borderColor} p-4 flex items-center gap-4`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* API Endpoints */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-700">API Endpoints</h3>
          </div>
          <div className="space-y-2">
            {apiEndpoints.map(({ path, method, desc }) => (
              <div
                key={path}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColor[method]}`}>
                  {method}
                </span>
                <code className="text-xs font-mono text-slate-700 flex-1">{path}</code>
                <span className="text-xs text-slate-400 hidden sm:block">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-700">Database Status</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">SQL Database</p>
                <p className="text-xs text-green-600 mt-0.5">
                  Tables: suppliers, orders, shipments, qc_reports — Connected
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">MongoDB</p>
                <p className="text-xs text-green-600 mt-0.5">
                  Collections: iot_logs, audit_trail — Connected
                </p>
              </div>
            </div>

            <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3.5 h-3.5 text-slate-500" />
                <p className="text-xs font-semibold text-slate-600">System Note</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                SQL tables and MongoDB collections connected for demonstration. This prototype
                shows how a hybrid database architecture can manage operational and IoT data
                in the AeroNetB system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
