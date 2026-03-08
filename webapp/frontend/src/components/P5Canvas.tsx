import { useEffect, useRef, useState } from "react";
import { ALLOWED_P5_METHODS } from "@/lib/p5AllowedMethods";

interface P5CanvasProps {
  code: string;
  isRunning: boolean;
  onError: (error: string) => void;
  onStop: () => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
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

export default function P5Canvas({ code, isRunning, onError, onStop, onCanvasReady }: P5CanvasProps) {
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
      const rawSketchFn = new Function(wrappedCode)();
      const wrappedSketchFn = (pInstance: any) => {
        const restrictedP = new Proxy(pInstance, {
          get(target, prop) {
            if (typeof prop !== "string") return Reflect.get(target, prop);
            if (!ALLOWED_P5_METHODS.has(prop)) {
              throw new Error(`'p.${prop}' is not available in this environment.`);
            }
            if (prop === "createCanvas") {
              return (..._args: any[]) => {
                const result = target.createCanvas(256, 64);
                const canvas = containerRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
                if (canvas) {
                  canvas.style.height = "100%";
                  canvas.style.width = "100%";
                  canvas.style.imageRendering = "pixelated";
                  canvas.style.display = "block";
                  onCanvasReady?.(canvas);
                }
                return result;
              };
            }
            const value = Reflect.get(target, prop);
            if (typeof value === "function") return value.bind(target);
            return value;
          },
          set(target, prop, value) {
            return Reflect.set(target, prop, value);
          },
        });
        rawSketchFn(restrictedP);
      };
      sketchRef.current = new p5(wrappedSketchFn, containerRef.current);
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
    <div
      className="bg-white rounded-lg shadow-inner overflow-hidden relative border-2 border-[#41afaa]"
      style={{ width: "100%", aspectRatio: "256/64" }}
    >
      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-xs text-center leading-snug">Click Play<br />to run</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
