/**
 * Quality Control Page — AeroNetB
 * Design: Card list with pass/fail badges and inspector details
 */
import DashboardLayout from "@/components/DashboardLayout";
import { AlertTriangle, CheckCircle, ClipboardCheck, XCircle } from "lucide-react";
import { useState } from "react";

interface QCReport {
  id: string;
  item: string;
  supplier: string;
  inspector: string;
  date: string;
  result: "Passed" | "Review Needed" | "Failed";
  notes: string;
}

const reports: QCReport[] = [
  {
    id: "QR101",
    item: "Turbine Blade Set",
    supplier: "SkyParts",
    inspector: "J. Williams",
    date: "2025-05-01",
    result: "Passed",
    notes: "All dimensions within tolerance. Surface finish acceptable.",
  },
  {
    id: "QR102",
    item: "Hydraulic Pump Unit",
    supplier: "AeroSupply",
    inspector: "M. Patel",
    date: "2025-05-02",
    result: "Review Needed",
    notes: "Minor pressure variance detected. Requires secondary inspection.",
  },
  {
    id: "QR103",
    item: "Avionics Module",
    supplier: "NordFlight",
    inspector: "L. Chen",
    date: "2025-05-03",
    result: "Passed",
    notes: "Functional tests completed. All systems nominal.",
  },
  {
    id: "QR104",
    item: "Landing Gear Assembly",
    supplier: "BetaAircraft",
    inspector: "R. Thompson",
    date: "2025-05-04",
    result: "Failed",
    notes: "Structural crack found on left strut. Batch rejected.",
  },
  {
    id: "QR105",
    item: "Fuel Injector Set",
    supplier: "AlphaComponents",
    inspector: "J. Williams",
    date: "2025-05-05",
    result: "Passed",
    notes: "Flow rate tests passed. Seals intact.",
  },
  {
    id: "QR106",
    item: "Navigation Display Unit",
    supplier: "TechWings",
    inspector: "M. Patel",
    date: "2025-05-05",
    result: "Review Needed",
    notes: "Screen calibration drift observed. Pending firmware update.",
  },
];

const resultConfig: Record<
  string,
  { badge: string; icon: React.ElementType; iconColor: string; rowBg: string }
> = {
  Passed:         { badge: "badge-green",  icon: CheckCircle,  iconColor: "text-green-500",  rowBg: "" },
  "Review Needed":{ badge: "badge-amber",  icon: AlertTriangle, iconColor: "text-amber-500", rowBg: "bg-amber-50/30" },
  Failed:         { badge: "badge-red",    icon: XCircle,       iconColor: "text-red-500",   rowBg: "bg-red-50/30" },
};

const summaryStats = [
  { label: "Total Reports", value: reports.length, color: "text-slate-800" },
  { label: "Passed",        value: reports.filter((r) => r.result === "Passed").length,         color: "text-green-600" },
  { label: "Review Needed", value: reports.filter((r) => r.result === "Review Needed").length,  color: "text-amber-600" },
  { label: "Failed",        value: reports.filter((r) => r.result === "Failed").length,         color: "text-red-600" },
];

export default function QualityControl() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = reports.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.item.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.result === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout
      pageTitle="Quality Control"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">QC Reports</h2>
          <p className="text-xs text-slate-500">Inspection results for received components</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {summaryStats.map(({ label, value, color }) => (
          <div key={label} className="bg-card rounded-xl border border-border p-3 text-center shadow-sm">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Passed", "Review Needed", "Failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
              filter === f
                ? "bg-slate-600 text-white shadow-sm"
                : "bg-white border border-border text-slate-600 hover:bg-slate-50"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-10 text-center text-slate-400 text-sm">
            No reports match your search or filter.
          </div>
        ) : (
          filtered.map((r) => {
            const { badge, icon: Icon, iconColor, rowBg } = resultConfig[r.result];
            return (
              <div
                key={r.id}
                className={`bg-card rounded-xl border border-border shadow-sm p-4 flex items-start gap-4 ${rowBg}`}
              >
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-slate-500">{r.id}</span>
                    <span className="font-semibold text-slate-800 text-sm">{r.item}</span>
                    <span className={badge}>{r.result}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1.5">
                    Supplier: <span className="font-medium text-slate-700">{r.supplier}</span>
                    {" · "}Inspector: <span className="font-medium text-slate-700">{r.inspector}</span>
                    {" · "}Date: <span className="font-medium text-slate-700">{r.date}</span>
                  </p>
                  <p className="text-xs text-slate-600 italic">{r.notes}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Data stored in SQL <code className="font-mono">qc_reports</code> table. Managed via{" "}
        <code className="font-mono">/api/qc-reports</code> endpoint.
      </p>
    </DashboardLayout>
  );
}
