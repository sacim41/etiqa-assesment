"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import "./bottom-tab.css";
import { GoStarFill } from "react-icons/go";

export default function BottomTab() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="bottom-tab">
      <Link
        href="/repo"
        className={`tab-item ${isActive("/repo") ? "active" : ""}`}
      >
        <GoStarFill size={22} />
        <span>Repos</span>
      </Link>

      <Link
        href="/settings"
        className={`tab-item ${isActive("/settings") ? "active" : ""}`}
      >
        <FiSettings size={22} />
        <span>Settings</span>
      </Link>
    </nav>
  );
}
