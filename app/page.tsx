import Link from 'next/link';

async function fetchBlogs() {
	const response = await fetch(`http://localhost:3000/api/blog`, {
		// next: { revalidate: 10 },
	});
	const data = await response.json();
	return data.posts;
}
export default async function Home() {
	const posts = await fetchBlogs();
	return (
		<main className="w-full h-full">
			<div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-600 drop-shadow-xl">
				<h1 className="text-slate-200 text-center text-2xl font-extrabold font-[ubuntu]">
					Full Stack blog app with NEXTJS
				</h1>
			</div>

			<div className="w-full text-center">
				<Link
					href={'/blog/add'}
					className="md:w-3/4 sm:-2/4 rounded p-2 m-auto bg-slate-200 font-semibold">
					Add New Blog 🚀
				</Link>
			</div>

			<div className="w-full flex flex-col justify-center items-center">
				{posts?.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center" key={post?.id}>
            
          </div>
				))}
			</div>
		</main>
	);
}
