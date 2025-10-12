import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60;

interface Project {
  _id: string;
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  // imageUrl?: string;
}

export default async function ProjectsPage() {
  const res = await fetch("http://localhost:5000/api/projects", { next: { revalidate: 60 } });
  const projects: Project[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">My Projects</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p: Project) => <ProjectCard key={p._id} project={p} />)}
      </div>
    </div>
  );
}
