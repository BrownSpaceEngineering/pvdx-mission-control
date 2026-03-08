"use client";

import { useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

interface CodeEditorPanelProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  errors: string[];
  autoRun: boolean;
}

const editorTheme = EditorView.theme({
  "&": { backgroundColor: "#1a3a5c", color: "#ffffff", fontSize: "14px" },
  ".cm-content": { caretColor: "#41afaa", fontFamily: "monospace" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#41afaa" },
  "&.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "#2F3F60" },
  ".cm-activeLine": { backgroundColor: "#253b5a" },
  ".cm-gutters": { backgroundColor: "#1a3a5c", color: "#8b9dc3", border: "none" },
  ".cm-activeLineGutter": { backgroundColor: "#253b5a", color: "#41afaa" },
  ".cm-lineNumbers": { color: "#8b9dc3" },
}, { dark: true });

export default function CodeEditorPanel({ code, onChange, onRun, errors, autoRun }: CodeEditorPanelProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      if (!autoRun) onRun();
    }
  }, [autoRun, onRun]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-full flex flex-col bg-[#1a3a5c] rounded-lg overflow-hidden">
      <div className="bg-[#2F3F60] px-4 py-2 flex items-center justify-between border-b border-[#41afaa]">
        <h3 className="text-white font-semibold text-sm">Code Editor</h3>
        {!autoRun && (
          <span className="text-xs text-gray-300 bg-[#1a3a5c] px-2 py-1 rounded">
            Cmd/Ctrl+Enter to run
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        <CodeMirror
          value={code}
          extensions={[javascript()]}
          theme={editorTheme}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            foldGutter: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
          }}
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-900 bg-opacity-50 border-t border-red-700 px-4 py-3">
          {errors.map((err, i) => (
            <div key={i} className="text-red-200 text-sm font-mono">{err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
