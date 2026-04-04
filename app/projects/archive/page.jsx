"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Projects from "@/json/data.json";
import Hr from "@/components/Hr";

function getShortDescription(project) {
	const firstLine = project.desc?.[0] ?? "";
	return firstLine.length > 120 ? `${firstLine.slice(0, 120)}...` : firstLine;
}

export default function Page() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const archivedProjects = Projects.Projects;

	return (
		<main className="overflow-hidden">
			<div className="min-h-screen w-screen pt-24 md:pt-28 p-6 md:p-10 flex justify-center items-center flex-col mb-10">
				<div className="my-5 w-full max-w-7xl mx-auto">
					<Link
						href="/projects"
						className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-black mb-4">
						&lt; Back to Projects
					</Link>
					<Hr variant="long" />
					<motion.h1
						className="text-3xl font-bold mt-3"
						initial={{ opacity: 0, x: -80 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2, duration: 0.6, type: "spring" }}>
						Archive
					</motion.h1>
				</div>

				<div className="w-full max-w-7xl mx-auto mt-10 border-2 border-gray-500 rounded-xl overflow-hidden bg-white">
					<div className="hidden md:grid md:grid-cols-[2fr_4fr_1fr] gap-4 px-5 py-3 bg-gray-200 border-b-2 border-gray-500 text-xs uppercase tracking-[0.12em] text-gray-700 font-semibold">
						<span>Project</span>
						<span>Description</span>
						<span>Links</span>
					</div>
					<div className="divide-y-2 divide-gray-400">
					{archivedProjects.map((project, index) => (
						<motion.div
							key={project.slug}
							initial={{ opacity: 0, y: 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.25, delay: index * 0.02 }}
							className="grid grid-cols-1 md:grid-cols-[2fr_4fr_1fr] gap-3 md:gap-4 px-5 py-5 odd:bg-gray-50 even:bg-gray-100/70 hover:bg-gray-200/60 transition-colors">
							<div className="font-semibold text-gray-900">{project.title}</div>
							<div className="text-gray-600 title text-sm leading-relaxed">
								{getShortDescription(project)}
							</div>
							<div className="flex items-center gap-3">
								{project.code ? (
									<a
										href={project.code}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm font-medium text-black underline underline-offset-2">
										Repo
									</a>
								) : (
									<span className="text-sm text-gray-400">-</span>
								)}
								{project.preview ? (
									<a
										href={project.preview}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm font-medium text-black underline underline-offset-2">
										Live
									</a>
								) : null}
							</div>
						</motion.div>
					))}
					</div>
				</div>
			</div>
		</main>
	);
}
