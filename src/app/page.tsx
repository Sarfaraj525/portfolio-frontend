import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 text-center">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
           Hi, I’m <span className="font-semibold text-white">Sarfaraj Nawaz Chowdhury</span> — a passionate{" "}
            <span className="text-cyan-400 font-semibold">Full-Stack Developer</span> who loves building
            scalable web applications with clean UI and great UX.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/projects"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full shadow-md transition transform hover:-translate-y-1"
            >
              View My Projects
            </a>
            <a
              href="/blogs"
              className="px-6 py-3 border border-cyan-400 hover:bg-cyan-500 hover:text-white text-cyan-400 font-semibold rounded-full shadow-md transition transform hover:-translate-y-1"
            >
              Read My Blogs
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
