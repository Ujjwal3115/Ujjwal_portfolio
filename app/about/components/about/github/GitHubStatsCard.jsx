"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
	faStar,
	faCodeFork,
	faBook,
} from "@fortawesome/free-solid-svg-icons";

const GitHubStatsCard = () => {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Replace with your GitHub username
	const GITHUB_USERNAME = "Ujjwal3115";

	useEffect(() => {
		const fetchGitHubStats = async () => {
			try {
				const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
				if (!response.ok) throw new Error("Failed to fetch");
				const data = await response.json();
				
				// Fetch repositories to calculate total stars
				const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
				const repos = await reposResponse.json();
				
				const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
				const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

				setStats({
					publicRepos: data.public_repos,
					followers: data.followers,
					following: data.following,
					totalStars,
					totalForks,
					avatarUrl: data.avatar_url,
					bio: data.bio,
					name: data.name,
				});
				setLoading(false);
			} catch (err) {
				console.error("Error fetching GitHub stats:", err);
				setError(true);
				setLoading(false);
			}
		};

		fetchGitHubStats();
	}, []);

	const StatItem = ({ icon, label, value, color }) => (
		<motion.div
			whileHover={{ y: -2 }}
			className="flex items-center gap-2 bg-[var(--poster-card)] px-3 py-2 rounded-2xl border-2 border-black">
			<FontAwesomeIcon icon={icon} className="text-lg" style={{ color }} />
			<div>
				<p className="text-sm text-gray-700">{label}</p>
				<p className="font-bold text-black">{value}</p>
			</div>
		</motion.div>
	);

	if (loading) {
		return (
			<div className="mt-6 w-full">
				<div className="poster-panel p-6 bg-[var(--poster-card)]">
					<div className="flex justify-center items-center py-8">
						<div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mt-6 w-full">
				<div className="poster-panel p-6 bg-[var(--poster-card)]">
					<p className="text-center text-gray-700">Unable to load GitHub stats</p>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="mt-6 w-full"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="poster-panel p-5 bg-[var(--poster-card)]">
				<div className="flex items-center gap-3 mb-4">
					<FontAwesomeIcon icon={faGithub} className="text-3xl text-black" />
					<div>
						<h3 className="text-xl font-bold text-black">GitHub Stats</h3>
						<p className="text-xs text-gray-700">@{GITHUB_USERNAME}</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 mb-3">
					<StatItem
						icon={faBook}
						label="Repositories"
						value={stats.publicRepos}
						color="#000000"
					/>
					<StatItem
						icon={faStar}
						label="Total Stars"
						value={stats.totalStars}
						color="#000000"
					/>
					<StatItem
						icon={faCodeFork}
						label="Total Forks"
						value={stats.totalForks}
						color="#000000"
					/>
					<StatItem
						icon={faGithub}
						label="Followers"
						value={stats.followers}
						color="#000000"
					/>
				</div>

				<motion.a
					href={`https://github.com/${GITHUB_USERNAME}`}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="block w-full text-center bg-[var(--poster-accent)] text-black py-2 rounded-2xl text-sm font-semibold border-2 border-black transition-colors hover:bg-[var(--poster-card)]">
					View GitHub Profile →
				</motion.a>
			</div>
		</motion.div>
	);
};

export default GitHubStatsCard;
