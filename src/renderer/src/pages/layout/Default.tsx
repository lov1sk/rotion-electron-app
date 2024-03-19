import { Header } from "@renderer/components/Header";
import { Sidebar } from "@renderer/components/Sidebar";
import { Outlet } from "react-router-dom";

export function Default() {
  return (
    <div className="font-sans w-screen h-screen bg-rotion-900 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
