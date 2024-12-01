"use client";
import { sidebar } from "@/lib/data";
import { LogsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Siderbar = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LogsIcon /> Soaring Eagle Inventory
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {sidebar?.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              >
                <span
                  className={`flex p-2 items-center gap-2 hover:bg-gray-100/50 ${
                    pathname == item.link && "bg-gray-100/90"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
