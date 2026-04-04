"use client";
import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import jsonData from "@/json/data.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import NotFound from "@/app/not-found";
import Image from "next/image";
import BlurImage from "@/public/image/placeholder/blur.jpg";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function ProjectImage({ src, alt, index }) {
	const [loaded, setLoaded] = useState(false);
	const handleLoad = useCallback(() => setLoaded(true), []);

	return (
		<div className="relative mb-5 max-w-7xl mx-auto w-full">
			{!loaded && (
				<div className="absolute inset-0 animate-pulse bg-neutral-300 rounded" />
			)}
			<Image
				src={src}
				alt={alt}
				width={1920}
				height={1080}
				className={`h-auto w-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
				placeholder="blur"
				blurDataURL={BlurImage.src}
				loading={index === 0 ? "eager" : "lazy"}
				onLoad={handleLoad}
			/>
		</div>
	);
}

function ScrollIndicator() {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const onScroll = () => {
			setShow(window.scrollY < 80);
		};

		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (!show) {
		return null;
	}

	return (
		<motion.div
			className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.4 } }}
			exit={{ opacity: 0 }}>
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
	);
}


function Page(props) {
    const params = use(props.params);
    const router = useRouter();
    const [data, setData] = useState(null);
    useEffect(() => {
		const selectedData = jsonData.Projects.find(
			(item) => item.slug === params.slug
		);
		if (selectedData === undefined) {
			setData("404");
		} else {
			setData(selectedData);
		}
	}, [params.slug]);

    if (data === "404") {
		return (
			<>
				<NotFound />
			</>
		);
	} else if (!data) {
		return (
			<div className="relative min-h-screen w-full  gap-4 p-10 flex justify-center items-center flex-col mb-10 ">
				<div className="min-h-screen flex justify-center items-center w-full">
					<div className="mx-auto grid grid-cols-1 md:grid-cols-2  w-full">
						<div className="flex justify-center items-start flex-col mb-5 space-y-10 w-ful p-4">
							<div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
							<div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
							<div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
							<div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
							<div className="animate-pulse bg-neutral-400 h-20 w-full rounded shadow-lg"></div>
						</div>
						<div className="flex justify-start items-start flex-col mb-5 w-full p-4">
							<div className="animate-pulse duration-500 shadow-lg bg-neutral-400 rounded  w-full h-full "></div>
						</div>
					</div>
				</div>
				{/* images */}
				<div className="mx-auto grid grid-cols-1 p-5 md:p-20  w-full h-auto">
					<div className="w-full h-auto aspect-video">
						<div className="animate-pulse duration-500 shadow-lg bg-neutral-400 h-full w-full rounded"></div>
					</div>
				</div>
			</div>
		);
	}
    return (
		<div className="relative min-h-screen w-full gap-4 p-10 flex justify-center items-center flex-col mb-10 ">
			<button
				onClick={() => router.back()}
				className="fixed top-16 md:top-20 left-4 md:left-10 flex justify-center items-center rounded-full p-4 transition duration-300 ease-in-out z-50 "
				aria-label="Go back">
				<FontAwesomeIcon icon={faChevronLeft} className="text-black pr-10 cursor-pointer" />
			</button>
			<ScrollIndicator />
			<div className="min-h-screen flex justify-center items-center">
				<div className="mx-auto grid grid-cols-1 md:grid-cols-2  mt-10 md:mt-0">
					<div className="min-h-screen sm:min-h-0 flex justify-center items-start flex-col mb-5 space-y-10 mx-auto">
						<div>
							<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
								Project
							</h2>
							<h1 className="text-4xl font-medium text-neutral-900">
								{data.title}
							</h1>
						</div>
						<div>
							<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
								Technology
							</h2>
							<p className="text-2xl font-normal text-neutral-900">
								{data.tech.join(", ")}
							</p>
						</div>
						<div>
							<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
								Year
							</h2>
							<p className="text-2xl font-normal text-neutral-900">
								{data.year}
							</p>
						</div>
						{data.preview && (
							<div>
								<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
									Preview
								</h2>
								<p className="text-2xl font-normal text-neutral-900">
									<a
										href={data.preview}
										target="_blank"
										rel="noopener noreferrer">
										Preview{" "}
										<FontAwesomeIcon
											icon={faArrowUpRightFromSquare}
											className="ml-3"
										/>
									</a>
								</p>
							</div>
						)}
						{data.code && (
							<div>
								<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
									Source Code
								</h2>
								<p className="text-2xl font-normal text-neutral-900">
									<a
										href={data.code}
										target="_blank"
										rel="noopener noreferrer">
										Github{" "}
										<FontAwesomeIcon
											icon={faGithub}
											className="ml-3"
										/>
									</a>
								</p>
							</div>
						)}
					</div>
					<div className="flex justify-start items-start flex-col mb-5 ">
						<h2 className="uppercase font-normal text-lg tracking-[8px] text-neutral-400">
							Description
						</h2>
						{data.desc.map((desc, index) => (
							<p
								key={index}
								className="text-xl text-justify tracking-wide font-normal text-gray-500 mb-5">
								{desc}
							</p>
						))}
					</div>
				</div>
			</div>
			{/* images */}
			<div className="mx-auto grid grid-cols-1 p-5 md:p-20 w-full">
				<div className="w-full h-auto text-center flex flex-col justify-center ">
					{data.images.map((image, index) => (
						<ProjectImage
							key={index}
							src={image}
							alt={`Project Image ${index + 1}`}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Page;
