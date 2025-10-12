interface Params { params: { id: string } }

export const revalidate = 60;

export default async function BlogDetails({ params }: Params) {
  const res = await fetch(`http://localhost:5000/api/blogs/${params.id}`, { next: { revalidate: 60 } });
  const blog = await res.json();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
