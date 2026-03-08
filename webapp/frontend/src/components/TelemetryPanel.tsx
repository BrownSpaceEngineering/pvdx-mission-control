"use client";

import { useState, useEffect } from "react";

type TelemetryData = {
    battery: number | null;
    elevation: number | null;
    temperature: number | null;
    signal_rssi: number | null;
    uptime_seconds: number | null;
};

type TelemetryResponse = {
    telemetry: TelemetryData;
    stale: boolean;
};

function formatUptime(seconds: number | null): string {
    if (seconds === null) return "—";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

export default function TelemetryPanel() {
    const [data, setData] = useState<TelemetryResponse | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const poll = async () => {
            try {
                const res = await fetch("http://localhost:8000/telemetry");
                if (!res.ok) throw new Error();
                const json = await res.json();
                setData(json);
                setError(false);
            } catch {
                setError(true);
            }
        };

        poll();
        const id = setInterval(poll, 5000);
        return () => clearInterval(id);
    }, []);

    const t = data?.telemetry;
    const stale = data?.stale ?? true;

    const batteryColor =
        t?.battery == null ? "text-gray-500"
        : t.battery > 60 ? "text-green-400"
        : t.battery > 30 ? "text-yellow-400"
        : "text-red-400";

    return (
        <div className="bg-[#1a2d4a] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Live Telemetry</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    error         ? "bg-red-900/50 text-red-300"
                    : stale       ? "bg-yellow-900/50 text-yellow-300"
                    :               "bg-green-900/50 text-green-300"
                }`}>
                    {error ? "offline" : stale ? "stale" : "live"}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f1c35] rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Battery</p>
                    <p className={`text-3xl font-bold ${batteryColor}`}>
                        {t?.battery != null ? `${t.battery}%` : "—"}
                    </p>
                </div>

                <div className="bg-[#0f1c35] rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Elevation</p>
                    <p className="text-3xl font-bold text-blue-300">
                        {t?.elevation != null ? `${t.elevation} km` : "—"}
                    </p>
                </div>

                <div className="bg-[#0f1c35] rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Temperature</p>
                    <p className="text-3xl font-bold text-yellow-400">
                        {t?.temperature != null ? `${t.temperature}°C` : "—"}
                    </p>
                </div>

                <div className="bg-[#0f1c35] rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Signal (RSSI)</p>
                    <p className="text-3xl font-bold text-purple-300">
                        {t?.signal_rssi != null ? `${t.signal_rssi} dBm` : "—"}
                    </p>
                </div>

                <div className="col-span-2 bg-[#0f1c35] rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Uptime</p>
                    <p className="text-2xl font-bold text-gray-300">
                        {formatUptime(t?.uptime_seconds ?? null)}
                    </p>
                </div>
            </div>
        </div>
    );
}
