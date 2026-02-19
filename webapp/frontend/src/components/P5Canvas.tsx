"use client";

import { useEffect, useRef, useState } from "react";

interface P5CanvasProps {
  code: string;
  isRunning: boolean;
  onError: (error: string) => void;
  onStop: () => void;
}

const dangerousPatterns = [
  { pattern: /\beval\s*\(/, msg: "eval() - can execute arbitrary code" },
  { pattern: /\bnew\s+Function\s*\(/, msg: "new Function() - can execute arbitrary code" },
  { pattern: /\bdocument\s*\./, msg: "document.* - DOM manipulation is restricted" },
  { pattern: /\bwindow\s*\./, msg: "window.* - global scope access is restricted" },
  { pattern: /\blocalStorage/, msg: "localStorage - storage access is restricted" },
  { pattern: /\bsessionStorage/, msg: "sessionStorage - storage access is restricted" },
  { pattern: /\bfetch\s*\(/, msg: "fetch() - network requests are restricted" },
  { pattern: /\bXMLHttpRequest/, msg: "XMLHttpRequest - network requests are restricted" },
  { pattern: /\bimport\s+/, msg: "import - dynamic imports are restricted" },
  { pattern: /\brequire\s*\(/, msg: "require() - module loading is restricted" },
];

function validateAndWrap(code: string): string {
  if (code && code.trim().length > 0) {
    for (const { pattern, msg } of dangerousPatterns) {
      if (pattern.test(code)) {
        throw new Error(`Forbidden API detected: ${msg}`);
      }
    }
  }
  return `return function(p) { ${code} };`;
}

export default function P5Canvas({ code, isRunning, onError, onStop }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<any>(null);
  const [p5, setP5] = useState<any>(null);

  useEffect(() => {
    import("p5").then((mod) => setP5(() => mod.default));
  }, []);

  useEffect(() => {
    if (!p5) return;

    const cleanup = () => {
      if (sketchRef.current) {
        try {
          sketchRef.current.remove();
        } catch (e) {
          console.error(e);
        }
      }
    };

    if (!isRunning || !code || !containerRef.current) {
      cleanup();
      return;
    }

    try {
      const wrappedCode = validateAndWrap(code);
      const sketchFn = new Function(wrappedCode)();
      sketchRef.current = new p5(sketchFn, containerRef.current);
    } catch (error) {
      cleanup();
      if (error instanceof Error) {
        onError(`Error: ${error.message}`);
      } else {
        onError("An error occurred");
      }
      onStop();
    }

    return cleanup;
  }, [code, isRunning, onError, onStop, p5]);

  return (
    <div className="h-full bg-white rounded-lg p-4 shadow-inner flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        {!isRunning && <p className="text-gray-400 text-xl">Click Play to run</p>}
      </div>
    </div>
  );
}
