'use client';

import { useState } from 'react';

type CommandResponse = {
    success: boolean;
    message: string;
};

export default function SatelliteControlPanel() {
    const [loading, setLoading] = useState<string | null>(null);
    const [response, setResponse] = useState<CommandResponse | null>(null);
    const [deviceId, setDeviceId] = useState('');
    const [bitmapData, setBitmapData] = useState('');

    const sendCommand = async (command: string) => {
        setLoading(command);
        setResponse(null);

        try {
            const res = await fetch('http://localhost:8000/commands/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command }),
            });

            if (res.ok) {
                setResponse({ success: true, message: `Command "${command}" sent successfully` });
            } else {
                setResponse({ success: false, message: `Failed to send command: ${res.statusText}` });
            }
        } catch (error) {
            setResponse({ success: false, message: `Error: ${error}` });
        } finally {
            setLoading(null);
        }
    };

    const handleDeviceCommand = (action: 'ENABLE' | 'DISABLE' | 'SET_BROKEN' | 'SET_WORKING') => {
        if (!deviceId.trim()) {
            setResponse({ success: false, message: 'Please enter a device ID' });
            return;
        }
        sendCommand(`${action}_DEVICE:${deviceId}`);
    };

    const handleBitmapUpdate = () => {
        if (!bitmapData.trim()) {
            setResponse({ success: false, message: 'Please enter bitmap data' });
            return;
        }
        sendCommand(`UPDATE_DISPLAY:${bitmapData}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">PVDXControl Panel</h1>

            {/* Response */}
            {response && (
                <div
                    className={`mb-6 p-4 rounded-lg ${response.success
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}
                >
                    {response.message}
                </div>
            )}

            {/* Commands */}
            <div className="mb-8 p-6 border border-gray-300 dark:border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Device Control</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Device ID"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        onClick={() => handleDeviceCommand('ENABLE')}
                        disabled={loading === `ENABLE_DEVICE:${deviceId}`}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Enable Device
                    </button>
                    <button
                        onClick={() => handleDeviceCommand('DISABLE')}
                        disabled={loading === `DISABLE_DEVICE:${deviceId}`}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Disable Device
                    </button>
                    <button
                        onClick={() => handleDeviceCommand('SET_BROKEN')}
                        disabled={loading === `SET_BROKEN_DEVICE:${deviceId}`}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Set Broken
                    </button>
                    <button
                        onClick={() => handleDeviceCommand('SET_WORKING')}
                        disabled={loading === `SET_WORKING_DEVICE:${deviceId}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Set Working
                    </button>
                </div>
            </div>

            {/* Display Update */}
            <div className="mb-8 p-6 border border-gray-300 dark:border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Display Update</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Bitmap data (hex or base64)"
                        value={bitmapData}
                        onChange={(e) => setBitmapData(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                </div>
                <button
                    onClick={handleBitmapUpdate}
                    disabled={loading === `UPDATE_DISPLAY:${bitmapData}`}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded transition-colors"
                >
                    Update Display
                </button>
            </div>

            {/* System Commands */}
            <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">System Commands</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <button
                        onClick={() => sendCommand('SLEEP_SATELLITE')}
                        disabled={loading === 'SLEEP_SATELLITE'}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Sleep Satellite
                    </button>
                    <button
                        onClick={() => sendCommand('REBOOT_SATELLITE')}
                        disabled={loading === 'REBOOT_SATELLITE'}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Reboot Satellite
                    </button>
                    <button
                        onClick={() => sendCommand('INITIATE_HANDSHAKE')}
                        disabled={loading === 'INITIATE_HANDSHAKE'}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Initiate Handshake
                    </button>
                    <button
                        onClick={() => sendCommand('TAKE_PICTURE')}
                        disabled={loading === 'TAKE_PICTURE'}
                        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Take Picture
                    </button>
                    <button
                        onClick={() => sendCommand('RECALIBRATE_ADCS')}
                        disabled={loading === 'RECALIBRATE_ADCS'}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                        Recalibrate ADCS
                    </button>
                </div>
            </div>
        </div>
    );
}
