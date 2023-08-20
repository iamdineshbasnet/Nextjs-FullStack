'use client';
import { POST } from '@/app/api/blog/route';
import { fetchBlogs } from '@/app/page';
import { useRouter } from 'next/navigation';
import { Fragment, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const postBlog = async ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	const res = await fetch(`http://localhost:3000/api/blog`, {
		method: 'POST',
		body: JSON.stringify({ title, description }),
		// @ts-ignore
		'Content-Type': 'application/json',
	});
	const data = await res.json();
	return data;
};

const AddBlog = () => {
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (titleRef.current && descriptionRef.current) {
			toast.loading('sending request 🚀', { id: '1' });
			await postBlog({
				title: titleRef.current?.value,
				description: descriptionRef.current?.value,
			});
			toast.success('Blog Added Successfully', { id: '1' });
			router.push("/")
			await fetchBlogs()
		}
	};
	return (
		<Fragment>
			<Toaster />
			<div className="w-full m-auto flex my-4">
				<div className="flex flex-col justify-center items-center m-auto">
					<p className="text-2xl text-slate-200 font-bold p-3">
						Add a wonderful blog 🚀
					</p>
					<form onSubmit={handleSubmit} className="text-right">
						<input
							ref={titleRef}
							type="text"
							className="rounded-md px-4 w-full py-2 my-2 focus:outline-none"
							placeholder="Enter title"
						/>
						<textarea
							ref={descriptionRef}
							rows={5}
							className="rounded-md px-4 w-full py-2 my-2 focus:outline-none"
							placeholder="Enter Description"
						/>
						<button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-md m-auto hover:bg-slate-100">
							Submit
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default AddBlog;
