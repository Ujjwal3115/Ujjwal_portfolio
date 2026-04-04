import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import BlurImage from "@/public/image/placeholder/blur.jpg";

export default function ProjectCard({ project, index, activeCategory }) {
	const categoryMap = {
		ai: [2],
		web: [1],
		other: [9],
	};

	const categoryKey = String(activeCategory).toLowerCase();
	const matchesCategory =
		categoryKey === "all"
			? true
			: (categoryMap[categoryKey] ?? []).some((value) =>
				project.category.includes(value),
			  );

	return (
		<>
			{matchesCategory && (
				<Link href={`/projects/${project.slug}`} key={index}>
					<motion.div
						className="z-10 relative flex justify-center items-start flex-col w-full h-auto bg-[#1b2233] group/tes py-7 px-4 sm:px-5 md:py-8 aspect-[4/5] sm:aspect-video overflow-hidden border border-[#3c4558]"
						initial={{
							opacity: 0,
							x: -200,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							type: "spring",
						}}>
						<Image
							src={project.thumbnail}
							alt={project.title}
							fill
							placeholder="blur"
							className="opacity-45 blur-[2px] scale-105 saturate-75 group-hover/tes:opacity-100 group-hover/tes:blur-0 group-hover/tes:scale-100 group-hover/tes:saturate-100 transition-all ease duration-500 object-cover"
							blurDataURL={BlurImage.src}
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/55 group-hover/tes:opacity-10 transition-opacity duration-500" />
						<div className="absolute inset-0 opacity-0 group-hover/tes:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_45%)]" />
						<div className="absolute top-0 left-0 bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 border-r border-b border-white/20">
							<h4 className="text-white text-[0.8rem] sm:text-base">{project.year}</h4>
						</div>
						<div className="transition-all ease duration-500 opacity-100 content text-center group-hover/tes:opacity-0 z-10 text-white px-1 sm:px-0">
							<h1 className="text-xl sm:text-xl md:text-3xl font-bold leading-tight mb-1.5 sm:mb-3 max-w-[92%] mx-auto">{project.title}</h1>
							<p className="text-[0.82rem] sm:text-sm md:text-base text-gray-100 leading-snug sm:leading-normal max-w-[92%] mx-auto">
								{project.desc[0].length > 125
									? `${project.desc[0].slice(0, 125)}...`
									: project.desc[0]}
							</p>
							<div className="flex justify-center items-center flex-row mt-2.5 sm:mt-4 flex-wrap gap-1.5 sm:gap-2 max-w-[92%] mx-auto">
								{project.tech.map((t, index) => (
									<span
										key={index}
										className="px-2.5 py-1 bg-black/45 border border-white/20 text-[0.68rem] sm:text-xs md:text-sm text-white backdrop-blur-sm">
										{t}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				</Link>
			)}
		</>
	);
}

ProjectCard.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
};
