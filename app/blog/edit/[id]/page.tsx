'use client';

import { fetchBlogs } from '@/app/page';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Fragment, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const editBlog = async ({
	title,
	description,
	id,
}: {
	title: string;
	description: string;
	id: string;
}) => {
	const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ title, description }),
		// @ts-ignore
		'Content-Type': 'application/json',
	});
	const data = await res.json();
	return data;
};

const getBlogPostById = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/blog/${id}`);
	const data = await res.json();
	return data.post;
};

const deleteBlogPostById = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
		method: 'DELETE',
		// @ts-ignore
		'Content-Type': 'application/json',
	});
	const data = await res.json();
	return data;
};

const EditPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

	const handleDelete = async (e: any) => {
		e.preventDefault();
		await deleteBlogPostById(params?.id)
			.then(async () => {
				toast.success('Post deleted successfully');
				router.push('/');
				await fetchBlogs();
			})
			.catch((error) => {
				toast.error('Failed to delete the post');
			});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (titleRef.current && descriptionRef.current && params.id) {
			toast.loading('sending request 🚀', { id: '1' });
			await editBlog({
				title: titleRef.current?.value,
				description: descriptionRef.current?.value,
				id: params.id,
			});
			toast.success('Blog updated Successfully', { id: '1' });
			router.push('/');
			await fetchBlogs();
		}
	};
	useEffect(() => {
		// if(!titleRef.current && !descriptionRef.current){
		toast.loading('Fetching blog details 🚀', { id: '1' });
		getBlogPostById(params?.id)
			.then((data) => {
				if (titleRef.current && descriptionRef.current) {
					titleRef.current.value = data.title;
					descriptionRef.current.value = data.description;
					toast.success('Fetching complete', { id: '1' });
				}
			})
			.catch((err) => {
				toast.error('Fetching failed', { id: '1' });
			});

		// }
	}, []);
	return (
		<Fragment>
			<Toaster />
			<div className="w-full m-auto flex my-4">
				<div className="flex flex-col justify-center items-center m-auto">
					<p className="text-2xl text-slate-200 font-bold p-3">
						update blog 🚀
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
							update 🔁
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-md m-auto hover:bg-red-500">
							delete 🪣
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default EditPage;
