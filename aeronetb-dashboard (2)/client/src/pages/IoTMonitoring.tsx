/**
 * IoT Monitoring Page — AeroNetB
 * Design: Sensor cards with status indicators, log table, MongoDB note
 */
import DashboardLayout from "@/components/DashboardLayout";
import { Activity, AlertTriangle, CheckCircle, Cpu, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";

interface SensorCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: "Normal" | "Warning" | "Critical";
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const initialSensors: SensorCard[] = [
  {
    id: "temp",
    label: "Temperature",
    value: "24",
    unit: "°C",
    status: "Normal",
    icon: Thermometer,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "vibration",
    label: "Vibration",
    value: "Normal",
    unit: "",
    status: "Normal",
    icon: Activity,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "pressure",
    label: "Pressure",
    value: "Stable",
    unit: "",
    status: "Normal",
    icon: Wind,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    id: "cpu",
    label: "CPU Load",
    value: "38",
    unit: "%",
    status: "Normal",
    icon: Cpu,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

interface LogEntry {
  time: string;
  sensor: string;
  reading: string;
  status: "Normal" | "Warning" | "Critical";
}

const iotLogs: LogEntry[] = [
  { time: "2025-05-06 08:00", sensor: "Temperature", reading: "24°C",    status: "Normal" },
  { time: "2025-05-06 08:05", sensor: "Vibration",   reading: "Normal",  status: "Normal" },
  { time: "2025-05-06 08:10", sensor: "Pressure",    reading: "Stable",  status: "Normal" },
  { time: "2025-05-06 08:15", sensor: "Temperature", reading: "26°C",    status: "Normal" },
  { time: "2025-05-06 08:20", sensor: "Vibration",   reading: "Elevated",status: "Warning" },
  { time: "2025-05-06 08:25", sensor: "Pressure",    reading: "Stable",  status: "Normal" },
  { time: "2025-05-06 08:30", sensor: "Temperature", reading: "24°C",    status: "Normal" },
  { time: "2025-05-06 08:35", sensor: "CPU Load",    reading: "38%",     status: "Normal" },
];

const statusBadge: Record<string, string> = {
  Normal:   "badge-green",
  Warning:  "badge-amber",
  Critical: "badge-red",
};

const statusIcon: Record<string, React.ElementType> = {
  Normal:   CheckCircle,
  Warning:  AlertTriangle,
  Critical: AlertTriangle,
};

const statusIconColor: Record<string, string> = {
  Normal:   "text-green-500",
  Warning:  "text-amber-500",
  Critical: "text-red-500",
};

export default function IoTMonitoring() {
  const [search, setSearch] = useState("");
  const [tick, setTick] = useState(0);

  // Simulate a "live" clock tick every 5 seconds
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const filteredLogs = iotLogs.filter(
    (l) =>
      l.sensor.toLowerCase().includes(search.toLowerCase()) ||
      l.reading.toLowerCase().includes(search.toLowerCase()) ||
      l.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      pageTitle="IoT Monitoring"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {/* Page header */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">IoT Sensor Dashboard</h2>
            <p className="text-xs text-slate-500">Real-time sensor readings from AeroNetB systems</p>
          </div>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live · Last updated just now
        </div>
      </div>

      {/* Sensor cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {initialSensors.map(({ id, label, value, unit, status, icon: Icon, iconBg, iconColor }) => {
          const StatusIcon = statusIcon[status];
          return (
            <div key={id} className="bg-card rounded-xl border border-border shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <StatusIcon className={`w-4 h-4 ${statusIconColor[status]}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800">
                {value}
                <span className="text-base font-normal text-slate-500">{unit}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              <span className={`${statusBadge[status]} mt-2`}>{status}</span>
            </div>
          );
        })}
      </div>

      {/* IoT Log table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-700">Sensor Log</h3>
          <span className="ml-auto text-xs text-slate-400">
            {filteredLogs.length} entries
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sensor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reading</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border last:border-0 hover:bg-slate-50 transition-colors ${
                    idx % 2 === 0 ? "" : "bg-slate-50/40"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.time}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{log.sensor}</td>
                  <td className="px-4 py-3 text-slate-600">{log.reading}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge[log.status]}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        IoT log data stored in MongoDB <code className="font-mono">iot_logs</code> collection.
        Managed via <code className="font-mono">/api/iot-logs</code> endpoint.
      </p>
    </DashboardLayout>
  );
}
