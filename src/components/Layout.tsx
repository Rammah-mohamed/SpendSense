// Layout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";

type Active = "Spend" | "Utilization" | "Renewals" | "Redundancy" | "Export";

export default function Layout() {
  const [text, setText] = useState<Active>("Spend");
  return (
    <div className="flex w-full h-screen">
      <Sidebar setText={setText} />
      <div className="flex flex-col flex-1">
        <Header text={text} />
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}
