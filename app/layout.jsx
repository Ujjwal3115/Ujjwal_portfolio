import "./globals.css";
import { Poppins, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Analytics } from "@vercel/analytics/react";
import Chat from "@/components/Chat";
import ClientTopProgressBar from "@/components/ClientTopProgressBar";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-poppins",
});

const jost = Jost({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-jost",
});

export const metadata = {
	metadataBase: new URL("https://ujjwal-main-portfolio.vercel.app/"),
	title: "Ujjwal Verma | Portfolio",

	description:
		"Ujjwal Verma - Computer Science Engineer specializing in AI/ML and Full Stack Development. Building award-winning ML models and scalable web applications with React, Next.js, and MLOps.",

	author: "Ujjwal Verma",
	siteUrl: "https://ujjwal-main-portfolio.vercel.app/",
	applicationName: "Ujjwal Verma Portfolio",

	keywords: [
		"ujjwal verma",
		"ujjwal",
		"machine learning developer",
		"full stack developer",
		"AI engineer",
		"react developer",
		"nextjs developer",
		"mlops",
		"portfolio",
		"computer science engineer",
	],

	openGraph: {
		type: "website",
		url: "https://ujjwal-main-portfolio.vercel.app/",
		title: "Ujjwal Verma | Portfolio",
		siteName: "Ujjwal Verma Portfolio",
		description: "Computer Science Engineer specializing in AI/ML and Full Stack Development. Building innovative solutions at the intersection of data science and web development.",
		images: [
			{
				url: "/og-image-rev.png",
				alt: "Ujjwal Verma Portfolio",
				width: 1200,
				height: 630,
			},
		],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Ujjwal Verma",
	url: "https://ujjwal-main-portfolio.vercel.app/",
	jobTitle: "ML Developer & Full Stack Developer",
	description: "Computer Science Engineer specializing in Artificial Intelligence and Machine Learning",
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Computer Science Engineering",
	},
	sameAs: [
		"https://github.com/Ujjwal3115",
		"https://www.linkedin.com/in/ujjwalverma3115/",
		"https://x.com/ujjwal3115",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${poppins.variable} ${jost.variable}`}>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<ClientTopProgressBar />
				<Navbar />
				{children}
				<Chat />
				<Analytics />
			</body>
		</html>
	);
}
