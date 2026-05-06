/**
 * Settings Page — AeroNetB
 * Design: Clean settings interface with theme toggle and user preferences
 */
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, SettingsIcon, Sun } from "lucide-react";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout pageTitle="Settings">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage your dashboard preferences</p>
        </div>
      </div>

      {/* Settings sections */}
      <div className="space-y-4 max-w-2xl">
        {/* Appearance section */}
        <div className="bg-card dark:bg-slate-900 rounded-xl shadow-sm border border-border dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">
            Appearance
          </h3>

          {/* Theme toggle */}
          <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border dark:border-slate-700">
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-400" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Theme</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Currently using {theme === "light" ? "Light" : "Dark"} mode
                </p>
              </div>
            </div>

            {/* Toggle button */}
            <button
              onClick={toggleTheme}
              className={`
                relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-200
                ${theme === "light"
                  ? "bg-slate-300 hover:bg-slate-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
                }
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200
                  ${theme === "light" ? "translate-x-1" : "translate-x-6"}
                `}
              />
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 px-3">
            Toggle between light and dark modes to match your preference. Your choice will be saved automatically.
          </p>
        </div>

        {/* General section */}
        <div className="bg-card dark:bg-slate-900 rounded-xl shadow-sm border border-border dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">
            General
          </h3>

          <div className="space-y-3">
            <div className="py-3 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border dark:border-slate-700">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Dashboard Language</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">English (default)</p>
            </div>

            <div className="py-3 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-border dark:border-slate-700">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Data Refresh Interval</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time updates enabled</p>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="bg-card dark:bg-slate-900 rounded-xl shadow-sm border border-border dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">
            About
          </h3>

          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-medium">Application:</span> AeroNetB Task 2 Dashboard
            </p>
            <p>
              <span className="font-medium">Version:</span> 1.0.0
            </p>
            <p>
              <span className="font-medium">Type:</span> Student Project Prototype
            </p>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              This dashboard demonstrates a hybrid SQL + MongoDB architecture for managing suppliers, shipments,
              quality control reports, and IoT sensor data in the AeroNetB system. Built with React, TypeScript,
              and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
