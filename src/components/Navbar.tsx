"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold">MyPortfolio</Link>
      <div className="flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blogs">Blogs</Link>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={logout} className="text-red-400 hover:text-red-300">Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
