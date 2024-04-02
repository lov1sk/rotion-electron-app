import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { Header } from "@renderer/components/Header";
import { Sidebar } from "@renderer/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <RadixCollapsible.Root
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
      className="font-sans w-screen h-screen bg-rotion-900 flex"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </RadixCollapsible.Root>
  );
}
