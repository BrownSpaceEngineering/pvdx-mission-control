"use client";

import { useState, useEffect } from "react";
import CodeEditorPanel from "./CodeEditorPanel";
import P5Canvas from "./P5Canvas";
import Layout from "./Layout";
import { getTemplate } from "@/lib/p5Templates";

export default function CodingEnv() {
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
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

    return (
        <div className="h-screen bg-[#e8eef5] flex overflow-hidden">
            <div className="flex-1 p-6">
                <div className="h-full flex gap-6">
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
                            <div className="h-full bg-[#1a3a5c] rounded-lg p-6 flex flex-col gap-6">
                                <div className="flex-1">
                                    <P5Canvas
                                        code={code}
                                        isRunning={isRunning}
                                        onError={handleError}
                                        onStop={handleStop}
                                    />
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <button onClick={handleStop} className="w-16 h-16 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors" title="Stop">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                            <rect x="8" y="8" width="8" height="8" />
                                        </svg>
                                    </button>
                                    <button onClick={handleRun} className="w-16 h-16 bg-[#41afaa] rounded-full flex items-center justify-center hover:bg-[#359e9a] transition-colors" title="Run">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                    <button className="w-16 h-16 bg-[#2F3F60] rounded-full flex items-center justify-center hover:opacity-90 transition-colors opacity-50 cursor-not-allowed" disabled>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                            <circle cx="12" cy="12" r="6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
