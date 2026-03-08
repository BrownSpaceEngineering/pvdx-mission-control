"use client";

import { useState, useEffect, useRef } from "react";
import CodeEditorPanel from "./CodeEditorPanel";
import P5Canvas from "./P5Canvas";
import Layout from "./Layout";
import MethodsReference from "./MethodsReference";
import { getTemplate } from "@/lib/p5Templates";
import { canvasToBitmapBytes } from "@/lib/canvasBitmap";

export default function CodingEnv() {
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [uploadStatus, setUploadStatus] = useState("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const autoRun = true;

    useEffect(() => {
        setCode(getTemplate("basic"));
        setIsRunning(true);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrors([]);
            setIsRunning(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, [code]);

    const handleRun = () => {
        setErrors([]);
        setIsRunning(true);
    };

    const handleStop = () => setIsRunning(false);
    const handleError = (error: string) => setErrors([error]);

    const handleUpload = async () => {
        if (!canvasRef.current) return;
        setUploadStatus("Converting...");
        const bytes = canvasToBitmapBytes(canvasRef.current);
        try {
            const res = await fetch("http://localhost:8000/upload", {
                method: "POST",
                headers: { "Content-Type": "application/octet-stream" },
                body: bytes,
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            setUploadStatus("Uploaded successfully.");
        } catch {
            const blob = new Blob([bytes], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "canvas.bin"; a.click();
            URL.revokeObjectURL(url);
            setUploadStatus("Server offline — downloaded canvas.bin.");
        }
    };

    return (
        <div className="flex flex-col bg-[#e8eef5]">
            <div className="h-screen flex p-4 flex-col gap-4">
                <div className="flex-1 flex gap-4 min-h-0">
                    <Layout
                        leftPanel={
                            <CodeEditorPanel
                                code={code}
                                onChange={setCode}
                                onRun={handleRun}
                                errors={errors}
                                autoRun={autoRun}
                            />
                        }
                        rightPanel={
                            <div className="h-full bg-[#1a3a5c] rounded-lg p-4 flex flex-col gap-4">
                                <div className="flex-1 min-h-0 flex items-center">
                                    <P5Canvas
                                        code={code}
                                        isRunning={isRunning}
                                        onError={handleError}
                                        onStop={handleStop}
                                        onCanvasReady={(c) => { canvasRef.current = c; }}
                                    />
                                </div>
                                <p className="text-center text-[#41afaa] text-xs opacity-70">256 × 64 px — locked</p>
                                <div className="flex gap-3 justify-center">
                                    <button onClick={handleStop} className="w-12 h-12 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors" title="Stop">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                            <rect x="6" y="6" width="12" height="12" />
                                        </svg>
                                    </button>
                                    <button onClick={handleRun} className="w-12 h-12 bg-[#41afaa] rounded-full flex items-center justify-center hover:bg-[#359e9a] transition-colors" title="Run">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                    <button onClick={handleUpload} className="w-12 h-12 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors" title="Upload">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                            <path d="M12 2l-6 6h4v8h4V8h4l-6-6z" />
                                            <rect x="4" y="18" width="16" height="2" />
                                        </svg>
                                    </button>
                                </div>
                                {uploadStatus && (
                                    <p className="text-center text-xs text-[#41afaa] opacity-80">{uploadStatus}</p>
                                )}
                            </div>
                        }
                    />
                </div>
            </div>
            <div className="px-4 pb-4">
                <MethodsReference />
            </div>
        </div>
    );
}
