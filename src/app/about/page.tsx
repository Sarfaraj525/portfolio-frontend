"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        About Me
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed"
      >
        <p className="text-lg">
          👋 Hi, I’m <span className="font-semibold text-blue-500">Sarfaraj Nawaz Chowdhury</span>.
        </p>
        <p className="text-lg">
          💻 I’m a <span className="font-semibold text-purple-500">Full-Stack Developer</span> specializing in
          <span className="font-semibold"> React, Node.js, MongoDB,</span> and <span className="font-semibold">Express</span>.
        </p>
        <p className="text-lg">
          🚀 Passionate about crafting clean, scalable, and user-friendly web applications.
          I enjoy solving real-world problems and continuously learning new technologies.
        </p>
        <p className="text-lg">
          ✨ My goal is to build impactful digital products that combine performance with beautiful design.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-10 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>“Turning ideas into elegant, functional web experiences.”</p>
      </motion.div>
    </div>
  );
}
