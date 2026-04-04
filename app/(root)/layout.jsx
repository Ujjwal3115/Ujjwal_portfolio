"use client";
import Sidebar from "@/components/Sidebar";
import { FullPageProvider } from "@alvalens/react-fullpage-snap";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)");

		const applyMediaState = (event) => {
			setIsMobile(event.matches);
		};

		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener("change", applyMediaState);

		return () => {
			mediaQuery.removeEventListener("change", applyMediaState);
		};
	}, []);

	return (
		<FullPageProvider
			anchors={["home", "about", "projects", "contact"]}
			scrollingSpeed={1000}
			menu="#sidebar"
			lockAnchors={false}
			keyboardScrolling={!isMobile}
			touchScrolling={!isMobile}
			wheelScrolling={!isMobile}>
			<Sidebar />
			{children}
		</FullPageProvider>
	);
}
