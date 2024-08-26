"use client";
import { useAuth } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}
