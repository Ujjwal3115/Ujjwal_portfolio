"use client";

// Quote.js
import "./style.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

const fallbackQuotes = [
	{
		quote: "There are no limits to what you can accomplish except the limits you place on your own thinking.",
		author: "Brian Tracy",
	},
	{
		quote: "Success is the sum of small efforts, repeated day in and day out.",
		author: "Robert Collier",
	},
	{
		quote: "The future depends on what you do today.",
		author: "Mahatma Gandhi",
	},
	{
		quote: "Consistency is what transforms average into excellence.",
		author: "Robin Sharma",
	},
	{
		quote: "The best way to predict the future is to create it.",
		author: "Peter Drucker",
	},
];

function getFallbackQuoteForToday() {
	const dayIndex = Math.floor(Date.now() / 86400000);
	return fallbackQuotes[dayIndex % fallbackQuotes.length];
}

function Wrapper({ children }) {
	return (
		<div className="min-h-[80vh] mx-auto container  p-10 grid grid-cols-1 mt-10 ">
			<motion.div
				className="flex justify-center items-center flex-col mb-5 "
				initial={{
					opacity: 0,
					scale: 0.9,
				}}
				whileInView={{
					opacity: 1,
					scale: 1,
				}}
				transition={{
					delay: 0.6,
					duration: 2,
					ease: [0.22, 1, 0.36, 1],
				}}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Quote() {
	const [dailyQuote, setDailyQuote] = useState(getFallbackQuoteForToday());
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [animationSeed, setAnimationSeed] = useState(0);
	const [ref, isIntersecting] = useIntersectionObserver();

	const fetchQuote = async (mode = "daily") => {
		const endpoint =
			mode === "random"
				? "/api/daily-quote?mode=random"
				: "/api/daily-quote";

		const response = await fetch(endpoint, {
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch quote");
		}

		const data = await response.json();
		if (data?.quote) {
			setDailyQuote({
				quote: data.quote,
				author: data.author || "Unknown",
			});
			setAnimationSeed((prev) => prev + 1);
		}
	};

	useEffect(() => {
		let isMounted = true;

		const fetchDailyQuote = async () => {
			try {
				await fetchQuote("daily");
			} catch {
				if (isMounted) {
					setDailyQuote(getFallbackQuoteForToday());
				}
			}
		};

		fetchDailyQuote();

		return () => {
			isMounted = false;
		};
	}, []);

	const quoteWords = `"${dailyQuote.quote}"`.split(" ");
	const midpoint = Math.ceil(quoteWords.length / 2);
	const text1 = quoteWords.slice(0, midpoint);
	const text2 = quoteWords.slice(midpoint);

	const handleRefreshQuote = async () => {
		setIsRefreshing(true);
		try {
			await fetchQuote("random");
		} catch {
			setDailyQuote(getFallbackQuoteForToday());
			setAnimationSeed((prev) => prev + 1);
		} finally {
			setIsRefreshing(false);
		}
	};

	return (
		<Wrapper>
			<div ref={ref} className="text-center">
				<h3 className="text-[2rem]">
					{text1.map((word, index) => (
						<motion.span
							key={`line1-${animationSeed}-${index}`}
							initial={{
								opacity: 0,
								filter: "blur(4px)",
								scale: 0.92,
							}}
							animate={{
								opacity: isIntersecting ? 1 : 0,
								filter: isIntersecting
									? "blur(0px)"
									: "blur(4px)",
								scale: isIntersecting ? 1 : 0.92,
							}}
							transition={{
								delay: isIntersecting ? index * 0.1 : 0,
								duration: 0.5,
							}}>
							{word}{" "}
						</motion.span>
					))}
				</h3>
				<h3 className="text-xl">
					{text2.map((word, index) => (
						<motion.span
							key={`line2-${animationSeed}-${index + text1.length}`}
							initial={{
								opacity: 0,
								filter: "blur(4px)",
								scale: 0.92,
							}}
							animate={{
								opacity: isIntersecting ? 1 : 0,
								filter: isIntersecting
									? "blur(0px)"
									: "blur(4px)",
								scale: isIntersecting ? 1 : 0.92,
							}}
							transition={{
								delay: isIntersecting
									? (text1.length + index) * 0.1
									: 0,
								duration: 0.5,
							}}>
							{word}{" "}
						</motion.span>
					))}
				</h3>
				<p className="mt-6 text-gray-600 text-base italic">
					— {dailyQuote.author}
				</p>
				<button
					type="button"
					onClick={handleRefreshQuote}
					disabled={isRefreshing}
					className="mt-6 rounded-xl border-2 border-black px-5 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-black hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-60">
					{isRefreshing ? "Loading..." : "New Quote"}
				</button>
			</div>
		</Wrapper>
	);
}
