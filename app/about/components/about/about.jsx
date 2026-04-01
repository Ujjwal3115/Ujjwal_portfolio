import Image from "next/image";
import GitHubStatsCard from "./github/GitHubStatsCard";
import { motion } from "framer-motion";
import Me1 from "@/public/image/me_5.webp";
import Me2 from "@/public/image/me_4.webp";
import Me3 from "@/public/image/me_2.webp";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3">Who Am I?</h1>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
				<div className="flex justify-center items-start flex-col mb-5 ">
					<div className="images relative w-full  aspect-square">
						<div className="absolute top-28 left-10 w-[50%]  aspect-square md:grayscale md:hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{ opacity: 0, scale: 0.5, x: 100 }}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								className="relative w-full h-full">
								<Image
									src={Me1}
									alt="Ujjwal Verma"
									fill
									sizes="(max-width: 768px) 80vw, 40vw"
									className="object-cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute top-16 right-28 w-[30%]  aspect-square md:grayscale md:hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.5,
									x: -100,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								transition={{ delay: 0.3 }}
								className="relative w-full h-full">
								<Image
									src={Me2}
									alt="Ujjwal Verma"
									fill
									sizes="(max-width: 768px) 60vw, 25vw"
									className="object-cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute bottom-16 right-20 w-[40%]  aspect-square md:grayscale md:hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.5,
									x: -100,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								transition={{
									delay: 0.5,
								}}
								className="relative w-full h-full">
								<Image
									src={Me3}
									alt="Ujjwal Verma"
									fill
									sizes="(max-width: 768px) 80vw, 35vw"
									className="object-cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
					</div>
				</div>
				<motion.div
					className="flex justify-center items-start flex-col mb-5 md:px-10"
					initial={{
						opacity: 0,
						x: 200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.5,

						type: "spring",
					}}>
					<h2 className="text-2xl font-bold tracking-wider mb-3">
						Ujjwal Verma
					</h2>
					<p className="text-gray-600 text-justify title text-lg leading-relaxed">
						I am an{" "}
						<span className="text-black font-semibold">AI &amp; Web Developer</span>{" "}
						specializing in{" "}
						<span className="text-black font-semibold">
							Deep Learning, React, and Next.js
						</span>
						. As a Computer Science (AIML) student at Dronacharya College of Engineering, I craft innovative solutions at the intersection of modern web technologies and artificial intelligence.
						<br />
						<br />
						I am currently the{" "}
						<span className="text-black font-semibold">Co-founder of Paradize.space</span>
						, a startup focused on building shared computing and decentralized compute infrastructure. I am also developing{" "}
						<span className="text-black font-semibold">
							&quot;Thoughts - The AI Diary,&quot;
						</span>{" "}
						a digital diary that uses AI analysis for mood tracking and insight generation. Beyond my projects, my experience includes serving as the{" "}
						<span className="text-black font-semibold">
							Design Lead
						</span>{" "}
						for the Google Developer Group (GDG) at my college, worked as an{" "}
						<span className="text-black font-semibold">ML Developer Intern</span> at JCB India, and competed as a{" "}
						<span className="text-black font-semibold">
							Smart India Hackathon 2024 Finalist
						</span>
						. I specialize in building scalable full-stack applications, designing intuitive user experiences, and integrating cutting-edge AI technologies to deliver measurable impact.
					</p>
					<GitHubStatsCard />
				</motion.div>
			</div>
		</>
	);
}
