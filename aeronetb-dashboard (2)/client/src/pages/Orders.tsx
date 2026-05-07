/**
 * Orders Page — AeroNetB
 * Design: White card table with status badges, searchable and filterable
 */
import DashboardLayout from "@/components/DashboardLayout";
import OrderDetailModal, { OrderDetail } from "@/components/OrderDetailModal";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  supplier: string;
  items: number;
  total: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

const orderDetails: Record<string, OrderDetail> = {
  O101: {
    id: "O101",
    supplier: "SkyParts",
    items: 15,
    total: "$4,250",
    status: "Delivered",
    date: "2025-04-20",
    estimatedDelivery: "2025-05-05",
    paymentTerms: "Net 30 - Due 2025-05-20",
    notes: "Expedited delivery completed on schedule.",
    deliveryAddress: { street: "123 Aviation Way", city: "Manchester", country: "UK", postalCode: "M1 1AA" },
    lineItems: [
      { id: "LI001", description: "Titanium Fasteners (Grade 5)", quantity: 500, unitPrice: "$2.50", subtotal: "$1,250" },
      { id: "LI002", description: "Structural Brackets", quantity: 100, unitPrice: "$18.00", subtotal: "$1,800" },
      { id: "LI003", description: "Inspection Certificates", quantity: 15, unitPrice: "$40.00", subtotal: "$600" },
      { id: "LI004", description: "Shipping & Handling", quantity: 1, unitPrice: "$600.00", subtotal: "$600" },
    ],
  },
  O102: {
    id: "O102",
    supplier: "AeroSupply",
    items: 8,
    total: "$2,100",
    status: "Delivered",
    date: "2025-04-25",
    estimatedDelivery: "2025-05-10",
    paymentTerms: "Net 30 - Due 2025-05-25",
    notes: "Standard delivery completed.",
    deliveryAddress: { street: "456 Aerospace Blvd", city: "Berlin", country: "Germany", postalCode: "10115" },
    lineItems: [
      { id: "LI005", description: "Hydraulic Hoses (1/2 inch)", quantity: 50, unitPrice: "$25.00", subtotal: "$1,250" },
      { id: "LI006", description: "Pressure Gauges", quantity: 8, unitPrice: "$85.00", subtotal: "$680" },
      { id: "LI007", description: "Shipping & Handling", quantity: 1, unitPrice: "$170.00", subtotal: "$170" },
    ],
  },
  O103: {
    id: "O103",
    supplier: "NordFlight",
    items: 12,
    total: "$3,800",
    status: "Shipped",
    date: "2025-05-01",
    estimatedDelivery: "2025-05-15",
    paymentTerms: "Net 30 - Due 2025-06-01",
    notes: "In transit via express courier.",
    deliveryAddress: { street: "789 Flight Center", city: "Stockholm", country: "Sweden", postalCode: "10215" },
    lineItems: [
      { id: "LI008", description: "Avionics Modules", quantity: 12, unitPrice: "$250.00", subtotal: "$3,000" },
      { id: "LI009", description: "Shipping & Handling", quantity: 1, unitPrice: "$800.00", subtotal: "$800" },
    ],
  },
  O104: {
    id: "O104",
    supplier: "TechWings",
    items: 20,
    total: "$5,600",
    status: "Processing",
    date: "2025-05-02",
    estimatedDelivery: "2025-05-20",
    paymentTerms: "Net 45 - Due 2025-06-17",
    notes: "Quality inspection in progress.",
    deliveryAddress: { street: "321 Tech Park", city: "New York", country: "USA", postalCode: "10001" },
    lineItems: [
      { id: "LI010", description: "Electronic Control Units", quantity: 20, unitPrice: "$220.00", subtotal: "$4,400" },
      { id: "LI011", description: "Shipping & Handling", quantity: 1, unitPrice: "$1,200.00", subtotal: "$1,200" },
    ],
  },
  O105: {
    id: "O105",
    supplier: "EuroAero",
    items: 6,
    total: "$1,950",
    status: "Confirmed",
    date: "2025-05-03",
    estimatedDelivery: "2025-05-25",
    paymentTerms: "Net 30 - Due 2025-06-03",
    notes: "Ready for shipment.",
    deliveryAddress: { street: "654 Aero Drive", city: "Paris", country: "France", postalCode: "75001" },
    lineItems: [
      { id: "LI012", description: "Hydraulic Pumps", quantity: 6, unitPrice: "$300.00", subtotal: "$1,800" },
      { id: "LI013", description: "Shipping & Handling", quantity: 1, unitPrice: "$150.00", subtotal: "$150" },
    ],
  },
  O106: {
    id: "O106",
    supplier: "PacificParts",
    items: 18,
    total: "$4,800",
    status: "Pending",
    date: "2025-05-04",
    estimatedDelivery: "2025-05-28",
    paymentTerms: "Net 30 - Due 2025-06-04",
    notes: "Awaiting payment confirmation.",
    deliveryAddress: { street: "987 Pacific Way", city: "Tokyo", country: "Japan", postalCode: "100-0001" },
    lineItems: [
      { id: "LI014", description: "Landing Gear Components", quantity: 18, unitPrice: "$250.00", subtotal: "$4,500" },
      { id: "LI015", description: "Shipping & Handling", quantity: 1, unitPrice: "$300.00", subtotal: "$300" },
    ],
  },
  O107: {
    id: "O107",
    supplier: "AlphaComponents",
    items: 10,
    total: "$2,750",
    status: "Processing",
    date: "2025-05-05",
    estimatedDelivery: "2025-05-22",
    paymentTerms: "Net 30 - Due 2025-06-05",
    notes: "Assembly phase in progress.",
    deliveryAddress: { street: "111 Component St", city: "Toronto", country: "Canada", postalCode: "M5H 2N2" },
    lineItems: [
      { id: "LI016", description: "Fuel Injectors", quantity: 10, unitPrice: "$220.00", subtotal: "$2,200" },
      { id: "LI017", description: "Shipping & Handling", quantity: 1, unitPrice: "$550.00", subtotal: "$550" },
    ],
  },
  O108: {
    id: "O108",
    supplier: "BetaAircraft",
    items: 14,
    total: "$3,900",
    status: "Confirmed",
    date: "2025-05-06",
    estimatedDelivery: "2025-05-30",
    paymentTerms: "Net 30 - Due 2025-06-06",
    notes: "Confirmed and scheduled for shipment.",
    deliveryAddress: { street: "222 Aircraft Blvd", city: "Amsterdam", country: "Netherlands", postalCode: "1012 WX" },
    lineItems: [
      { id: "LI018", description: "Navigation Systems", quantity: 14, unitPrice: "$250.00", subtotal: "$3,500" },
      { id: "LI019", description: "Shipping & Handling", quantity: 1, unitPrice: "$400.00", subtotal: "$400" },
    ],
  },
  O109: {
    id: "O109",
    supplier: "SkyParts",
    items: 9,
    total: "$2,400",
    status: "Pending",
    date: "2025-05-06",
    estimatedDelivery: "2025-05-26",
    paymentTerms: "Net 30 - Due 2025-06-06",
    notes: "Pending customer approval.",
    deliveryAddress: { street: "333 Sky Ave", city: "Manchester", country: "UK", postalCode: "M1 1AA" },
    lineItems: [
      { id: "LI020", description: "Wing Struts", quantity: 9, unitPrice: "$250.00", subtotal: "$2,250" },
      { id: "LI021", description: "Shipping & Handling", quantity: 1, unitPrice: "$150.00", subtotal: "$150" },
    ],
  },
  O110: {
    id: "O110",
    supplier: "NordFlight",
    items: 11,
    total: "$3,200",
    status: "Cancelled",
    date: "2025-04-28",
    estimatedDelivery: "2025-05-12",
    paymentTerms: "Net 30 - Cancelled",
    notes: "Order cancelled per customer request on 2025-05-02.",
    deliveryAddress: { street: "444 Nord Way", city: "Stockholm", country: "Sweden", postalCode: "10215" },
    lineItems: [
      { id: "LI022", description: "Avionics Displays", quantity: 11, unitPrice: "$250.00", subtotal: "$2,750" },
      { id: "LI023", description: "Shipping & Handling", quantity: 1, unitPrice: "$450.00", subtotal: "$450" },
    ],
  },
};

const orders: Order[] = [
  { id: "O101", supplier: "SkyParts",         items: 15, total: "$4,250",  status: "Delivered", date: "2025-04-20" },
  { id: "O102", supplier: "AeroSupply",       items: 8,  total: "$2,100",  status: "Delivered", date: "2025-04-25" },
  { id: "O103", supplier: "NordFlight",       items: 12, total: "$3,800",  status: "Shipped",   date: "2025-05-01" },
  { id: "O104", supplier: "TechWings",        items: 20, total: "$5,600",  status: "Processing",date: "2025-05-02" },
  { id: "O105", supplier: "EuroAero",         items: 6,  total: "$1,950",  status: "Confirmed", date: "2025-05-03" },
  { id: "O106", supplier: "PacificParts",     items: 18, total: "$4,800",  status: "Pending",   date: "2025-05-04" },
  { id: "O107", supplier: "AlphaComponents",  items: 10, total: "$2,750",  status: "Processing",date: "2025-05-05" },
  { id: "O108", supplier: "BetaAircraft",     items: 14, total: "$3,900",  status: "Confirmed", date: "2025-05-06" },
  { id: "O109", supplier: "SkyParts",         items: 9,  total: "$2,400",  status: "Pending",   date: "2025-05-06" },
  { id: "O110", supplier: "NordFlight",       items: 11, total: "$3,200",  status: "Cancelled", date: "2025-04-28" },
];

const statusBadge: Record<string, string> = {
  "Pending":     "badge-amber",
  "Confirmed":   "badge-blue",
  "Processing":  "badge-slate",
  "Shipped":     "badge-blue",
  "Delivered":   "badge-green",
  "Cancelled":   "badge-red",
};

const statusColor: Record<string, string> = {
  "Pending":     "text-amber-700",
  "Confirmed":   "text-blue-700",
  "Processing":  "text-slate-700",
  "Shipped":     "text-blue-700",
  "Delivered":   "text-green-700",
  "Cancelled":   "text-red-700",
};

const summaryStats = [
  { label: "Total Orders", value: orders.length, color: "text-slate-800 dark:text-slate-100" },
  { label: "Pending",      value: orders.filter((o) => o.status === "Pending").length,      color: "text-amber-600 dark:text-amber-400" },
  { label: "Processing",   value: orders.filter((o) => o.status === "Processing").length,   color: "text-slate-600 dark:text-slate-400" },
  { label: "Delivered",    value: orders.filter((o) => o.status === "Delivered").length,    color: "text-green-600 dark:text-green-400" },
];

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openOrderDetail = (orderId: string) => {
    const detail = orderDetails[orderId as keyof typeof orderDetails];
    if (detail) {
      setSelectedOrder(detail);
      setIsModalOpen(true);
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.supplier.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout
      pageTitle="Orders"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Orders</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {filtered.length} of {orders.length} orders shown
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {summaryStats.map(({ label, value, color }) => (
          <div key={label} className="bg-card dark:bg-slate-900 rounded-xl border border-border dark:border-slate-700 p-3 text-center shadow-sm">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
              filter === f
                ? "bg-slate-600 dark:bg-slate-500 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 border border-border dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-card dark:bg-slate-900 rounded-xl shadow-sm border border-border dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-border dark:border-slate-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Supplier</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Items</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
                    No orders match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((o, idx) => (
                  <tr
                    key={o.id}
                    onClick={() => openOrderDetail(o.id)}
                    className={`border-b border-border dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                      idx % 2 === 0 ? "" : "bg-slate-50/40 dark:bg-slate-900/40"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300 text-xs font-semibold">{o.id}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-100 font-medium">{o.supplier}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{o.items}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-medium">{o.total}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{o.date}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge[o.status]}>{o.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        Data stored in SQL <code className="font-mono">orders</code> table. Managed via{" "}
        <code className="font-mono">/api/orders</code> endpoint. Click any order row to view details.
      </p>

      {/* Order Detail Modal */}
      <OrderDetailModal order={selectedOrder} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </DashboardLayout>
  );
}
