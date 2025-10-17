"use client";

import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaBlog, FaProjectDiagram } from "react-icons/fa";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <Toaster position="top-right" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Welcome to Your Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Blog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage Blogs</h2>
            <FaBlog className="text-blue-500 text-2xl" />
          </div>
          <p className="text-gray-600">
            Create, edit, and delete your blog posts directly from the dashboard.
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
          >
            Go to Blogs
          </button>
        </motion.div>

        {/* Projects Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Projects Overview</h2>
            <FaProjectDiagram className="text-green-500 text-2xl" />
          </div>
          <p className="text-gray-600">
            Track and manage your projects, view their current status, and update progress.
          </p>
          <button
            onClick={() => router.push("/projects")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium"
          >
            View Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
