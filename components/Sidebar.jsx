"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUser,
	faFolderOpen,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useFullPage } from "@alvalens/react-fullpage-snap";
import { motion } from "framer-motion";

const navItems = [
	{ icon: faHome, label: "Go to Home section", anchor: "home" },
	{ icon: faUser, label: "Go to About section", anchor: "about" },
	{ icon: faFolderOpen, label: "Go to Projects section", anchor: "projects" },
	{ icon: faEnvelope, label: "Go to Contact section", anchor: "contact" },
];

const Sidebar = () => {
	const { moveTo, activeIndex } = useFullPage();

	return (
		<div className="hidden md:flex fixed z-40 left-4 top-1/4">
			<ul
				id="sidebar"
				className="poster-panel flex flex-col justify-evenly items-center h-[52vh] w-20 p-3 bg-[var(--poster-card)] relative z-10">
				{navItems.map((item, index) => (
					<li key={item.anchor} data-menuanchor={item.anchor}>
						<button
							aria-label={item.label}
							onClick={() => moveTo(index)}
							className="relative flex items-center justify-center w-12 h-12 cursor-pointer rounded-full border-2 border-black bg-[var(--poster-card)] shadow-[3px_3px_0_var(--poster-ink)] transition-transform duration-200 hover:-translate-y-[1px]">
							{activeIndex === index && (
								<motion.div
									layoutId="sidebar-active"
									className="absolute inset-0 bg-[var(--poster-accent)] rounded-full"
									transition={{
										type: "spring",
										stiffness: 350,
										damping: 30,
									}}
								/>
							)}
							<FontAwesomeIcon
								icon={item.icon}
								className={`relative z-10 text-xl text-black transition-transform duration-300 ${
									activeIndex === index
										? "scale-110"
										: "scale-100"
								}`}
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
