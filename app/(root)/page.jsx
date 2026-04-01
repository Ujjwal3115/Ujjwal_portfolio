"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FullPageWrapper, Section, useFullPage } from "@alvalens/react-fullpage-snap";

// components
import Button from "@/components/Button";
import VariableProximity from '@/components/VariableProximity.jsx';
// import Me from "@/public/image/ujjwal-front.webp";
import Me from "@/public/image/me_6.png";
import MeAbout from "@/public/image/me_3.webp";
import Setup from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects.png";
import Hr from "@/components/Hr";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ScrollIndicator() {
	const { activeIndex } = useFullPage();
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (activeIndex !== 0) setDismissed(true);
	}, [activeIndex]);

	return (
		<AnimatePresence>
			{activeIndex === 0 && !dismissed && (
				<motion.div
					className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.6, delay: 1.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.4 } }}>
					<span className="text-[10px] uppercase tracking-[4px] text-gray-500 font-medium">
						Scroll
					</span>
					<motion.div
						className="w-[1.5px] h-14 bg-gray-500 origin-top"
						animate={{
							scaleY: [0, 1, 1],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
							times: [0, 0.5, 1],
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function FullPageHashNavigator() {
	const { moveTo } = useFullPage();

	useEffect(() => {
		const mapHashToIndex = (hash) => {
			switch (hash) {
				case "home":
					return 0;
				case "about":
					return 1;
				case "projects":
					return 2;
				case "contact":
					return 3;
				default:
					return null;
			}
		};

		const navigateToHash = (hash) => {
			if (!hash) {
				return;
			}

			const sectionIndex = mapHashToIndex(hash);
			if (sectionIndex !== null) {
				moveTo(sectionIndex);
			}
		};

		const handleHashChange = () => {
			navigateToHash(window.location.hash.replace("#", ""));
		};

		const handleMenuNavigate = (event) => {
			navigateToHash(event.detail?.hash);
		};

		window.addEventListener("hashchange", handleHashChange);
		window.addEventListener("fullpage:navigate", handleMenuNavigate);

		if (window.location.hash) {
			handleHashChange();
		}

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
			window.removeEventListener("fullpage:navigate", handleMenuNavigate);
		};
	}, [moveTo]);

	return null;
}

const MyPage = () => {
	const heroTitleRef = useRef(null);

	return (
		<FullPageWrapper>
			<FullPageHashNavigator />
			<Section>
				<div className="mx-auto w-[82%] max-w-screen-2xl poster-panel grid grid-cols-1 md:grid-cols-3 gap-4 p-8 md:p-10 overflow-hidden relative">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							type: "spring",
						}}>
						<div className="block md:hidden col-span-1 mx-auto my-10">
							<div className="bg-slate-500 rounded-full h-60 w-60 transition-all ease duration-300">
								<Image
									src={Me}
									width={500}
									height={500}
									className="rounded-full w-full h-full object-cover "
									alt="Ujjwal Verma"
									placeholder="blur"
								/>
							</div>
						</div>
						<div className="poster-chip mb-5 md:mb-7">Ujjwal Verma</div>
						<motion.h3
							className="text-xl mb-3 font-semibold tracking-[.3rem] text-gray-600 cursor-default"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							AI • FULL STACK • ML
						</motion.h3>
						<motion.h1
							ref={heroTitleRef}
							className="text-black text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-black my-2 md:my-5 cursor-default"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
							}}>
							<VariableProximity 
								label={"AI & Full Stack Web Developer"}
								className={'variable-proximity-demo'}
								fromFontVariationSettings="'wght' 500, 'opsz' 9"
								toFontVariationSettings="'wght' 1000, 'opsz' 40"
								containerRef={heroTitleRef}
								radius={100}
								falloff='linear'
							/>
						</motion.h1>
						<motion.p
							className="title text-md 2xl:text-xl mt-4 tracking-wider text-gray-600 leading-[1.7rem] cursor-default max-w-2xl"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								type: "spring",
							}}>
						Hi! I am Ujjwal, an ML enthusiast and full-stack developer. I am
						passionate about tackling complex problems by bridging the gap
						between data-driven machine learning models and user-centric web
						applications.
						</motion.p>
						<motion.div
							className="buttons flex flex-row justify-center items-center space-x-4 mt-10 font-semibold"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.5,
								type: "spring",
							}}>
							<Button variation="primary">
								<Link
									href={"/docs/LATEST_RESUME_AI.pdf"}
									target="_blank"
									rel="noopener noreferrer"
									download>
									Download Resume
								</Link>
							</Button>
							<Button variation="secondary">
								<a href="#contact">Contact Me</a>
							</Button>
						</motion.div>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center"
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							type: "spring",
						}}>
						<div className="poster-panel p-4 rounded-[2rem] h-auto w-auto max-w-[26vw] lg:px-6 transition-all ease duration-300">
							<div className="poster-window-dots">
								<span />
								<span />
								<span />
							</div>
							<Image
								src={Me}
								width={400}
								height={550}
								placeholder="blur"
							alt="Ujjwal Verma"
								className="rounded-[1.4rem] h-full object-cover"
							/>
						</div>
					</motion.div>
				</div>
			</Section>
			<Section>
				<div className="relative md:h-screen w-screen gap-4 flex justify-center items-center flex-col overflow-hidden">
					<div className="z-0 mb-48 md:mb-0  md:absolute md:top-1/2  md:right-[10%] md:-translate-y-1/2">
						<motion.div
							className="relative bg-slate-300 rounded-sm h-[400px] md:h-[60vh] w-[80vw] md:w-[30vw] transition-color ease duration-400"
							initial={{
								x: 300,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								type: "spring",
								stiffness: 100,
								damping: 20,
							}}>
							<Image
								src={MeAbout}
								fill
								sizes="(max-width: 768px) 80vw, 30vw"
								className="object-cover"
							alt="Ujjwal Verma"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
						<motion.h1
							className="bg-white lg:bg-transparent cursor-default bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								type: "spring",
							}}>
							About Me
						</motion.h1>
						<Hr />
						<motion.p
							className="title  text-xl mt-4 tracking-wider text-gray-700 cursor-default leading-[1.7rem] mb-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							A brief introduction my journey as a software
							engineer.
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
							}}>
							<Button variation="primary">
								<Link href="/about">Learn More</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</Section>
			<Section>
				<div className="relative md:h-screen w-screen gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
					<div className="z-0 mb-48 md:mb-0  md:absolute md:top-1/2  md:right-[10%] md:-translate-y-1/2">
						<motion.div
							className="relative bg-slate-300 rounded-sm h-[400px] md:h-[60vh] w-[80vw] md:w-[30vw] transition-color ease duration-400"
							initial={{
								x: 300,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								type: "spring",
								stiffness: 100,
								damping: 20,
							}}>
							<Image
								src={ProjectAll}
								fill
								sizes="(max-width: 768px) 80vw, 30vw"
								className="object-cover"
							alt="My Projects"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 py-5">
						<motion.h1
							className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								type: "spring",
							}}>
							My Projects
						</motion.h1>
						<Hr />
						<motion.p
							className="title  text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							Selected works that I&apos;ve built over the years.
							<span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
								{" "}
								and currently working on.
							</span>
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
							}}>
							<Button variation="primary">
								<Link href="/projects">Learn More</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</Section>
			<Section>
				<div className="relative md:h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col overflow-hidden">
					<div className="z-0 mb-48 md:mb-0  md:absolute md:top-1/2  md:right-[10%] md:-translate-y-1/2">
						<motion.div
							className="relative bg-slate-300 rounded-sm h-[400px] md:h-[60vh] w-[80vw] md:w-[30vw]"
							initial={{
								x: 300,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								type: "spring",
								stiffness: 100,
								damping: 20,
							}}>
							<Image
								src={Setup}
								fill
								sizes="(max-width: 768px) 80vw, 30vw"
								className="object-cover"
							alt="My Setup"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto  md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 overflow-hidden">
						<motion.h1
							className="bg-white lg:bg-transparent bg-opacity-50 px-3 md-px-0 text-black text-5xl md:text-8xl font-bold mb-3 cursor-default"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								type: "spring",
							}}>
							Get In Touch
						</motion.h1>
						<Hr />
						<motion.p
							className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] md:mb-5 cursor-default"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								type: "spring",
							}}>
							Feel free to contact me if you have any{" "}
							<span className="bg-transparent md:bg-gray-100 bg-opacity-50 xl:bg-transparent">
								questions or just want to say hi.
							</span>
						</motion.p>
						<motion.p
							className="title text-xl mt-4 tracking-wider text-gray-500 leading-[1.7rem] mb-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								type: "spring",
							}}>
							<a href="mailto:ujjwalverma3115@gmail.com?subject=Hello&body=Hello Ujjwal,">
								ujjwalverma3115@gmail.com
							</a>
						</motion.p>
						{/* icons */}
						<div className="flex justify-center items-center space-x-4">
							<motion.a
								href="mailto:ujjwalverma3115@gmail.com?subject=Hello&body=Hello Ujjwal,"
								aria-label="Send email"
								className="flex justify-center items-center bg-black w-14 h-14 rounded-full text-gray-100 hover:bg-[var(--poster-accent)] hover:text-black transition-all ease-in-out duration-300"
								initial={{ y: 40, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{
									y: { delay: 0.1 },
									opacity: { delay: 0.2 },
								}}>
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-3xl"
								/>
							</motion.a>

							<motion.a
								href="https://github.com/Ujjwal3115"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub profile"
								className="flex justify-center items-center bg-black w-14 h-14 rounded-full text-gray-100 hover:bg-[var(--poster-accent)] hover:text-black transition-all ease-in-out duration-300"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									y: { delay: 0.2 },
									opacity: { delay: 0.3 },
								}}>
								<FontAwesomeIcon
									icon={faGithub}
									className="text-3xl"
								/>
							</motion.a>
							<motion.a
								href="https://x.com/ujjwal3115"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="X (Twitter) profile"
								className="flex justify-center items-center bg-black w-14 h-14 rounded-full text-gray-100 hover:bg-[var(--poster-accent)] hover:text-black transition-all ease-in-out duration-300"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									y: { delay: 0.3 },
									opacity: { delay: 0.4 },
								}}>
								<FontAwesomeIcon
									icon={faXTwitter}
									className="text-3xl"
								/>
							</motion.a>
							<motion.a
								href="https://www.linkedin.com/in/ujjwalverma3115/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn profile"
								className="flex justify-center items-center bg-black w-14 h-14 rounded-full text-gray-100 hover:bg-[var(--poster-accent)]   hover:text-black transition-all ease-in-out duration-300"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									y: { delay: 0.4 },
									opacity: { delay: 0.5 },
								}}>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="text-3xl"
								/>
							</motion.a>

						</div>
					</div>
				</div>
			</Section>
			<ScrollIndicator />
		</FullPageWrapper>
	);
};

export default MyPage;
