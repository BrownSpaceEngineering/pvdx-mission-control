"use client";

import { ReactNode } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";

interface LayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export default function Layout({ leftPanel, rightPanel }: LayoutProps) {
  return (
    <Group orientation="horizontal" className="h-full">
      <Panel defaultSize={50} minSize={30} className="h-full">
        {leftPanel}
      </Panel>
      <Separator className="w-2 bg-[#2F3F60] hover:bg-[#41afaa] transition-colors cursor-col-resize flex items-center justify-center group">
        <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-white transition-colors" />
      </Separator>
      <Panel defaultSize={50} minSize={30} className="h-full">
        {rightPanel}
      </Panel>
    </Group>
  );
}
