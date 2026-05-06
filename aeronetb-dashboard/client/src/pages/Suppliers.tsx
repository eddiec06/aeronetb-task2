/**
 * Suppliers Page — AeroNetB
 * Design: White card table, searchable, with country flags as text
 */
import DashboardLayout from "@/components/DashboardLayout";
import { Package } from "lucide-react";
import { useState } from "react";

interface Supplier {
  id: number;
  name: string;
  country: string;
  category: string;
  status: "Active" | "Inactive" | "Under Review";
}

const suppliers: Supplier[] = [
  { id: 1,  name: "SkyParts",         country: "UK",          category: "Structural Components",   status: "Active" },
  { id: 2,  name: "AeroSupply",       country: "Germany",     category: "Engine Parts",             status: "Active" },
  { id: 3,  name: "NordFlight",       country: "Sweden",      category: "Avionics",                 status: "Active" },
  { id: 4,  name: "TechWings",        country: "USA",         category: "Electronics",              status: "Under Review" },
  { id: 5,  name: "EuroAero",         country: "France",      category: "Hydraulics",               status: "Active" },
  { id: 6,  name: "PacificParts",     country: "Japan",       category: "Fasteners",                status: "Inactive" },
  { id: 7,  name: "AlphaComponents",  country: "Canada",      category: "Fuel Systems",             status: "Active" },
  { id: 8,  name: "BetaAircraft",     country: "Netherlands", category: "Landing Gear",             status: "Active" },
];

const statusBadge: Record<string, string> = {
  "Active":       "badge-green",
  "Inactive":     "badge-slate",
  "Under Review": "badge-amber",
};

export default function Suppliers() {
  const [search, setSearch] = useState("");

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      pageTitle="Suppliers"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
          <Package className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Supplier Registry</h2>
          <p className="text-xs text-slate-500">
            {filtered.length} of {suppliers.length} suppliers shown
          </p>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Supplier ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 text-sm">
                    No suppliers match your search.
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
                    <td className="px-4 py-3 font-mono text-slate-500 text-xs">
                      SUP-{String(s.id).padStart(3, "0")}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600">{s.country}</td>
                    <td className="px-4 py-3 text-slate-600">{s.category}</td>
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

      {/* Info note */}
      <p className="text-xs text-slate-400 mt-4">
        Data stored in SQL <code className="font-mono">suppliers</code> table. Managed via{" "}
        <code className="font-mono">/api/suppliers</code> endpoint.
      </p>
    </DashboardLayout>
  );
}
