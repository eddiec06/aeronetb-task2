/**
 * OrderDetailModal — AeroNetB
 * Design: Clean modal with order details, line items, and delivery information
 */
import { X } from "lucide-react";

export interface OrderDetail {
  id: string;
  supplier: string;
  items: number;
  total: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  lineItems: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: string;
    subtotal: string;
  }>;
  deliveryAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentTerms: string;
  estimatedDelivery: string;
  notes: string;
}

interface Props {
  order: OrderDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColor: Record<string, string> = {
  "Pending":     "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Confirmed":   "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Processing":  "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  "Shipped":     "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Delivered":   "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Cancelled":   "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function OrderDetailModal({ order, isOpen, onClose }: Props) {
  if (!isOpen || !order) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card dark:bg-slate-900 rounded-xl shadow-lg border border-border dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card dark:bg-slate-900 border-b border-border dark:border-slate-700 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Details</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Order ID: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Supplier</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">{order.supplier}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order Date</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">{order.date}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Est. Delivery</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">{order.estimatedDelivery}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</p>
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mt-1 ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Line Items</h3>
              <div className="border border-border dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-border dark:border-slate-700">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Description</th>
                      <th className="text-center px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Qty</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Unit Price</th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.lineItems.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-border dark:border-slate-700 last:border-0 ${
                          idx % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-800/50"
                        }`}
                      >
                        <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{item.description}</td>
                        <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
                        <td className="px-4 py-2 text-right text-slate-600 dark:text-slate-400">{item.unitPrice}</td>
                        <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-100">{item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full sm:w-64 space-y-2">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span>${order.total.replace("$", "")}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Shipping:</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-border dark:border-slate-700 pt-2 flex justify-between text-base font-bold text-slate-800 dark:text-slate-100">
                  <span>Total:</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Delivery Address</h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-border dark:border-slate-700">
                <p className="text-sm text-slate-800 dark:text-slate-100">{order.deliveryAddress.street}</p>
                <p className="text-sm text-slate-800 dark:text-slate-100">
                  {order.deliveryAddress.city}, {order.deliveryAddress.country} {order.deliveryAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Payment Terms</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{order.paymentTerms}</p>
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Notes</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-border dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 transition-colors">
              Print Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
