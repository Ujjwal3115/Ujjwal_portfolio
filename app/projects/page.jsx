"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Projects from "@/json/data.json";
import ProjectCard from "./components/ProjectCard.jsx";
import Hr from "@/components/Hr";
import Button from "@/components/Button";

import NeuroDecode4 from "@/public/image/projects/ai/Neurodecode/ncd_4.webp";
import ProjectAll from "@/public/image/projects.png";

const categoryTabs = [
	{ key: "all", label: "All" },
	{ key: "ai", label: "AI" },
	{ key: "web", label: "Web" },
	{ key: "other", label: "Other" },
];

const categoryMap = {
	ai: [2],
	web: [1],
	other: [9],
};

function getShortDescription(project) {
	const firstLine = project.desc?.[0] ?? "";
	return firstLine.length > 120 ? `${firstLine.slice(0, 120)}...` : firstLine;
}

function matchesCategory(project, activeCategory) {
	if (activeCategory === "all") {
		return true;
	}

	const categoryValues = categoryMap[activeCategory] ?? [];
	return categoryValues.some((value) => project.category?.includes(value));
}

export default function Page() {
	const [activeCategory, setActiveCategory] = useState("all");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const projects = Projects.Projects;
	const selectedProjects = useMemo(
		() =>
			projects.filter(
				(project) => project.show !== false && project.slug !== "neurodecode",
			),
		[projects],
	);
	const filteredProjects = useMemo(
		() =>
			selectedProjects.filter((project) => matchesCategory(project, activeCategory)),
		[selectedProjects, activeCategory],
	);
	const visibleProjects = filteredProjects.slice(0, 8);

	return (
		<main className="overflow-hidden">
			<section className="relative h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
				<div className="z-0 mb-48 md:mb-0 md:absolute top-1/4 md:right-[10%] md:-translate-y-16">
					<motion.div
						initial={{ scale: 1 }}
						animate={{ scale: 1.6 }}
						transition={{ duration: 1, ease: "circOut" }}
						className="relative bg-slate-300 rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] md:grayscale md:hover:grayscale-0">
						<Image
							src={ProjectAll}
							alt="Projects overview"
							fill
							placeholder="blur"
							className="object-cover"
							sizes="(max-width: 768px) 80vw, 30vw"
							loading="lazy"
						/>
					</motion.div>
				</div>
				<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start text-start px-10 pt-4 backdrop-filter backdrop-blur-sm md:backdrop-blur-none md:backdrop-filter-none bg-gray-100 bg-opacity-50 md:bg-transparent md:pt-0">
					<h1 className="md:bg-white bg-transparent lg:bg-transparent bg-opacity-50 md:px-0 text-black text-5xl md:text-8xl font-bold">
						My Projects
					</h1>
					<Hr />
					<p className="title text-xl mt-4 tracking-wider text-gray-900 leading-[1.7rem] mb-5 max-w-2xl">
						A filtered collection of selected work, grouped by AI, Web, and Other.
						Use the archive for older projects and quick external links.
					</p>
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "circOut" }}
						onClick={() => {
							window.scrollTo({
								top: 1000,
								behavior: "smooth",
							});
						}}
						className="mb-3">
						<Button variation="primary">Scroll Down</Button>
					</motion.div>
				</div>
			</section>

			<section className="mt-10 flex flex-col justify-start items-center w-full px-6 md:px-10">
				<div className="flex justify-center items-start flex-col my-5 w-full max-w-7xl mx-auto">
					<Hr variant="long" />
					<h2 className="text-3xl font-bold mt-3">Highlight</h2>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="w-full mx-auto max-w-7xl mb-10">
					<div className="relative w-full mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 mb-10">
						<div className="flex justify-center items-start flex-col mb-8 md:mb-5 px-5 md:px-0">
							<div className="images relative w-full">
								<div className="relative w-full flex justify-center items-center">
									<motion.div
										initial={{ opacity: 0, scale: 0.5, x: 100 }}
										whileInView={{ opacity: 1, scale: 1, x: 0 }}
										className="relative w-11/12 md:w-5/6 shadow-lg overflow-hidden aspect-video">
										<div className="relative w-full h-full overflow-hidden">
											<Image
												src={NeuroDecode4}
												alt="NeuroDecode final output"
												fill
												placeholder="blur"
												className="object-cover"
												sizes="(max-width: 768px) 80vw, 45vw"
												loading="lazy"
											/>
										</div>
									</motion.div>
								</div>
							</div>
						</div>
						<motion.div
							className="flex justify-center items-start flex-col mb-5 px-5 md:px-10 pt-6 md:pt-0"
							initial={{ opacity: 0, x: 200 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5, type: "spring" }}>
							<h3 className="text-2xl md:text-3xl font-bold tracking-wider mb-3">
								NeuroDecode
							</h3>
							<p className="text-gray-600 text-justify title text-base md:text-lg">
								NeuroDecode is an AI-powered developer tool that bridges visual
								system design and executable code. It lets users upload neural
								network architecture diagrams and automatically translates them into
								structured Markdown analysis and deployable PyTorch code.
							</p>
							<div className="mt-4 flex gap-3 flex-wrap">
								<Button variation="primary">
									<Link href="/projects/neurodecode">More</Link>
								</Button>
								<Button variation="secondary">
									<a
										href="https://neurodecode-five.vercel.app/"
										target="_blank"
										rel="noopener noreferrer">
										Visit
									</a>
								</Button>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</section>

			<section className="mt-16 flex flex-col justify-start items-center w-full px-6 md:px-10">
				<div className="flex justify-center items-start flex-col my-5 w-full max-w-7xl mx-auto">
					<Hr variant="long" />
					<h2 className="text-3xl font-bold mt-3">Selected Projects</h2>
					<p className="mt-3 text-gray-600 max-w-2xl">
						These are the projects I want to keep in the main gallery. Filter them
						by category to focus on AI, Web, or Other work.
					</p>
				</div>

				<div className="w-full max-w-7xl mx-auto flex flex-wrap gap-3 mt-5 mb-10">
					{categoryTabs.map((tab) => {
						const count =
							tab.key === "all"
								? selectedProjects.length
								: selectedProjects.filter((project) => matchesCategory(project, tab.key))
									.length;

						const isActive = activeCategory === tab.key;

						return (
							<button
								key={tab.key}
								type="button"
								onClick={() => setActiveCategory(tab.key)}
								className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${isActive ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"}`}>
								{tab.label} <span className="ml-1 opacity-70">{count}</span>
							</button>
						);
					})}
				</div>

				<div className="w-full max-w-7xl mx-auto">
						{filteredProjects.length > 8 ? (
							<p className="mb-4 text-sm text-gray-500">
								Showing the first 8 projects in this category. Open the archive for the full list.
							</p>
						) : null}
						{visibleProjects.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
								{visibleProjects.map((project, index) => (
								<ProjectCard
									key={project.slug}
									project={project}
									index={index}
									activeCategory={activeCategory}
								/>
								))}
							</div>
					) : (
						<div className="rounded-2xl border border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
							No projects match this category yet.
						</div>
					)}
				</div>
			</section>

			<section className="mt-20 flex flex-col justify-start items-center w-full px-6 md:px-10 pb-20">
				<div className="flex justify-between items-end w-full max-w-7xl mx-auto gap-4 flex-wrap">
					<div>
						<Hr variant="long" />
						<h2 className="text-3xl font-bold mt-3">Archive</h2>
						<p className="mt-3 text-gray-600 max-w-2xl">
							The archive contains a copy of every project, including items that
							also appear in the featured and highlight sections.
						</p>
					</div>
					<Button variation="secondary">
						<Link href="/projects/archive">Open archive</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
