// Layout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

type Active = "Dashbaord" | "Utilization" | "Renewals" | "Redundancy" | "Export";

export default function Layout() {
  const [text, setText] = useState<Active>("Dashbaord");
  return (
    <div className="flex w-full h-screen">
      <Sidebar setText={setText} />
      <div className="flex flex-col flex-1">
        <Header text={text} />
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
