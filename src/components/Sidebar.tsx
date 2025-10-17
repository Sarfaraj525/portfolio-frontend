"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaInfoCircle, FaBlog, FaEnvelope, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-20"
      } min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Header / Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <h1 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>Dashboard</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <SidebarLink href="/" icon={<FaHome />} label="Home" isOpen={isOpen} />
        <SidebarLink href="/about" icon={<FaInfoCircle />} label="About" isOpen={isOpen} />
        <SidebarLink href="/blog" icon={<FaBlog />} label="Blog" isOpen={isOpen} />
        <SidebarLink href="/contact" icon={<FaEnvelope />} label="Contact" isOpen={isOpen} />
        <SidebarLink href="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" isOpen={isOpen} />
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700 text-sm text-gray-400 text-center">
        {isOpen && <p>© 2025 Sarfaraj Nawaz Chowdhury</p>}
      </div>
    </div>
  );
};

// ✅ Reusable Link Component
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const SidebarLink = ({ href, icon, label, isOpen }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition"
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="text-base font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
