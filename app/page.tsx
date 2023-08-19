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
			<div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-600 drop-shadow-xl">
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
					<div
						className="w-3/4 px-4 py-0 rounded-md mx-3 my-8 bg-slate-200 flex flex-col justify-center"
						key={post?.id}>
						<div className="flex items-center my-3">
							<div className="mr-auto">
								<div className="mr-auto font-semibold">
									{post?.title}
								</div>
							</div>
							<Link
								href={`/blog/edit/${post?.id}`}
								className="px-5 py-1 text-center text-sl bg-slate-900 rounded-md font-normal text-slate-200">
								Edit 📝
							</Link>
						</div>

						<div className="mr-auto my-1">
							<blockquote className="font-bold text-slate-700">
								{new Date(post?.date).toDateString()}
							</blockquote>
						</div>
						<div className="mr-auto my-1">
							<h2>{post?.description}</h2>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
