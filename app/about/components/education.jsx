"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAward,
	faChevronDown,
	faChevronUp,
	faMedal,
	faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import Me4 from "@/public/image/me_4.webp";
import Me5 from "@/public/image/me_5.webp";
import Me6 from "@/public/image/me_6.png";

function Wrapper({ children }) {
	return (
		<div className="mt-16 flex flex-col justify-start items-center w-full px-2 md:px-6 lg:px-10 pb-10">
			<motion.div
				className="w-full max-w-7xl"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);

	const achievementsByYear = {
		2026: [
			{
				icon: faAward,
				title: "Organizer | Code & Chaos Hackathon",
				subtitle: "GDG On Campus, Dronacharya College of Engineering",
				date: "Feb 2026",
				color: "from-blue-500 to-purple-600",
			},
		],
		2025: [
			{
				icon: faMedal,
				title: "Certification | Foundations: Data, Data, Everywhere",
				subtitle: "Google via Coursera",
				date: "Nov 2025",
				color: "from-yellow-400 to-orange-500",
			},
			{
				icon: faTrophy,
				title: "Winner (1st Prize)",
				subtitle: "Multilingual AI-Powered System for Online Radicalization Detection",
				date: "2025",
				color: "from-yellow-400 to-orange-500",
			},
			{
				icon: faAward,
				title: "Silver Elite Certification | Java Programming",
				subtitle: "NPTEL",
				date: "Apr 2025",
				color: "from-blue-500 to-purple-600",
			},
			{
				icon: faAward,
				title: "Technical Certification | Tech Saksham Training Program",
				subtitle: "Edunet Foundation in collaboration with SAP & Microsoft",
				date: "Mar 2025",
				color: "from-blue-500 to-purple-600",
			},
		],
		2024: [
			{
				icon: faAward,
				title: "Finalist | Smart India Hackathon (SIH) 2024",
				subtitle: "Water Footprint Calculator App (Team Agrobuddies)",
				date: "2024",
				color: "from-blue-500 to-purple-600",
			},
			{
				icon: faAward,
				title: "Technical Certification | Introduction to Python",
				subtitle: "Infosys Springboard",
				date: "Apr 2024",
				color: "from-blue-500 to-purple-600",
			},
		],
		2023: [
			{
				icon: faAward,
				title: "Technical Certification | C Programming",
				subtitle: "Spoken Tutorial Project, IIT Bombay",
				date: "Dec 2023",
				color: "from-blue-500 to-purple-600",
			},
						{
				icon: faMedal,
				title: "2nd Place | Engineers Day Idea Competition",
				subtitle: "Fire-resistant system for car accidents",
				date: "Sept 2023",
				color: "from-slate-400 to-slate-500",
			},
		],
	};

	// Flatten all achievements into a single array for easier limiting
	const allAchievements = Object.entries(achievementsByYear)
		.sort(([a], [b]) => parseInt(b) - parseInt(a))
		.flatMap(([year, achievements]) =>
			achievements.map((achievement) => ({ ...achievement, year }))
		);

	const visibleAchievements = isExpanded
		? allAchievements
		: allAchievements.slice(0, 6);
	const hasMoreAchievements = allAchievements.length > 6;

	return (
		<Wrapper>
			<section className="grid gap-8 md:gap-12">
				{" "}
				{/* Header */}
				<motion.div
					className="text-center space-y-2"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
						Education
					</h1>
					<p className="text-muted-foreground max-w-[800px] mx-auto">
						Get to know more about my educational background.
					</p>
				</motion.div>
				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Education Section - Left */}
					<motion.div
						className="px-5"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="font-medium text-lg mb-4">
							2023 - 2027
						</div>
						<div>
							<h2 className="font-semibold text-xl">
							Dronacharya College of Engineering, Gurugram
						</h2>
						<h3 className="text-md font-normal mb-3">
							B.Tech | Computer Science (AIML)
							</h3>
							<div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me5}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me4}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Me6}
										width={400}
										height={225}
										alt="University"
										className="rounded-lg w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 text-justify title text-lg">
									I am pursuing my Bachelor of Technology in Computer Science (AIML) from{" "}
									<span className="text-black font-medium">
										Dronacharya College of Engineering
									</span>
									. My academic journey is defined by a balance of rigorous technical research, hands-on execution, and a deep curiosity for intelligent systems.
									<br />
									<br />
									As the{" "}
									<span className="text-black font-medium">
										Design Lead of the Google Developer Group (GDG) on campus
									</span>
									, I spearhead technical and creative initiatives. Recently, I received a{" "}
									<span className="text-black font-medium">
										Certificate of Recognition
									</span>{" "}
									for my role as an Organizer of the &quot;Code &amp; Chaos&quot; hackathon in February 2026. Beyond the classroom, I have applied my skills on a national scale, securing a spot as a{" "}
									<span className="text-black font-medium">
										Finalist at the Smart India Hackathon (SIH) 2024
									</span>
									, winning{" "}
									<span className="text-black font-medium">
										first prize for a multilingual AI radicalization detection system
									</span>
									, and taking second place at the Engineers Day Idea Competition for designing a fire-resistant safety system.
									<br />
									<br />
									My education serves as the engineering foundation for my current work in{" "}
									<span className="text-black font-medium">
										full-stack web development, deep learning, and decentralized computing through Paradize.space
									</span>
									. I remain committed to bridging academic innovation with production-ready, scalable software solutions.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-gray-300 text-black px-2 py-1 rounded-2xl">
									CGPA: 8.31
								</div>
							</div>
						</div>
					</motion.div>{" "}
					{/* Achievements Section - Right */}
					<motion.div
						className="flex flex-col justify-start px-5 md:px-0"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<h2 className="font-semibold text-xl mt-7">
							Achievements
						</h2>
						<p className="text-md font-normal mb-3 md:mb-6">
							Some of my achievements during my study.
						</p>

						{/* achievements Container starting*/}
						<div className="relative">
							<div className="space-y-4">
								{/* visible achievements Section */}
								<AnimatePresence>
									{visibleAchievements.map(
										(achievement, index) => (
											<motion.div
												key={`${achievement.year}-${index}`}
												className="group"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{
													duration: 0.5,
													delay: index * 0.05,
												}}>
												{/* Year indicator for first achievement of each year */}
												{index === 0 ||
												visibleAchievements[index - 1]
													?.year !==
													achievement.year ? (
													<div className="flex items-center gap-3 mb-3 mt-2 ">
														<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-default">
															<span className="text-xs font-bold text-gray-600">
																{
																	achievement.year
																}
															</span>
														</div>
														<div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
													</div>
												) : null}

												{/* Glassmorphism achievement card with monochrome to color effect */}
												<div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300 hover:shadow-xl grayscale hover:grayscale-0 cursor-default">
													<div className="flex items-center gap-4">
														<div
															className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}>
															<FontAwesomeIcon
																icon={
																	achievement.icon
																}
																className="text-white h-5 w-5"
															/>
														</div>
														<div>
															<h3 className="font-medium">
																{
																	achievement.title
																}
															</h3>
															<p className="text-sm">
																{
																	achievement.subtitle
																}
															</p>
															<div className="text-xs text-gray-500 mt-1">
																{
																	achievement.date
																}
															</div>
														</div>
													</div>
												</div>
											</motion.div>
										),
									)}
								</AnimatePresence>
							</div>

							{/* Transparent bottom overlay when not expanded */}
							{!isExpanded && hasMoreAchievements && (
								<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stale-300 via-stale/70 to-transparent pointer-events-none"></div>
							)}

							{/* Expand/Collapse Button */}
							{hasMoreAchievements && (
								<motion.div
									className="flex justify-center mt-6"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}>
									<button
										onClick={() =>
											setIsExpanded(!isExpanded)
										}
										className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/40 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl cursor-pointer">
										<span>
											{isExpanded
												? `Show Less`
												: `Show ${allAchievements.length - 4} More`}
										</span>
										<FontAwesomeIcon
											icon={
												isExpanded
													? faChevronUp
													: faChevronDown
											}
											className="h-3 w-3 transition-transform duration-300"
										/>
									</button>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</Wrapper>
	);
}
