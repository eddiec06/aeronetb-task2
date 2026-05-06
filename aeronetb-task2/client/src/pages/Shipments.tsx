/**
 * Shipments Page — AeroNetB
 * Design: White card table with status badges, filter tabs
 */
import DashboardLayout from "@/components/DashboardLayout";
import { Truck } from "lucide-react";
import { useState } from "react";

interface Shipment {
  id: string;
  orderId: string;
  supplier: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Pending" | "Delayed";
  date: string;
}

const shipments: Shipment[] = [
  { id: "S001", orderId: "O102", supplier: "SkyParts",        destination: "Manchester, UK",   status: "In Transit", date: "2025-05-01" },
  { id: "S002", orderId: "O103", supplier: "AeroSupply",      destination: "Berlin, Germany",  status: "Delivered",  date: "2025-04-28" },
  { id: "S003", orderId: "O104", supplier: "NordFlight",      destination: "Stockholm, SE",    status: "Pending",    date: "2025-05-05" },
  { id: "S004", orderId: "O105", supplier: "TechWings",       destination: "New York, USA",    status: "Delayed",    date: "2025-04-30" },
  { id: "S005", orderId: "O106", supplier: "EuroAero",        destination: "Paris, France",    status: "Delivered",  date: "2025-04-25" },
  { id: "S006", orderId: "O107", supplier: "PacificParts",    destination: "Tokyo, Japan",     status: "In Transit", date: "2025-05-03" },
  { id: "S007", orderId: "O108", supplier: "AlphaComponents", destination: "Toronto, Canada",  status: "Pending",    date: "2025-05-06" },
];

const statusBadge: Record<string, string> = {
  "In Transit": "badge-blue",
  "Delivered":  "badge-green",
  "Pending":    "badge-amber",
  "Delayed":    "badge-red",
};

const filters = ["All", "In Transit", "Delivered", "Pending", "Delayed"] as const;

export default function Shipments() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = shipments.filter((s) => {
    const matchSearch =
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.orderId.toLowerCase().includes(search.toLowerCase()) ||
      s.supplier.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || s.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout
      pageTitle="Shipments"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
          <Truck className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Shipment Tracker</h2>
          <p className="text-xs text-slate-500">
            {filtered.length} of {shipments.length} shipments shown
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
              activeFilter === f
                ? "bg-slate-600 text-white shadow-sm"
                : "bg-white border border-border text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Shipment ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Supplier</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                    No shipments match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={`border-b border-border last:border-0 hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? "" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-slate-700 text-xs font-semibold">{s.id}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-xs">{s.orderId}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{s.supplier}</td>
                    <td className="px-4 py-3 text-slate-600">{s.destination}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{s.date}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge[s.status]}>{s.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Data stored in SQL <code className="font-mono">shipments</code> table. Managed via{" "}
        <code className="font-mono">/api/shipments</code> endpoint.
      </p>
    </DashboardLayout>
  );
}
