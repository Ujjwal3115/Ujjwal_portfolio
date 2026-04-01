"use client";
import dynamic from "next/dynamic";

const StaggeredMenu = dynamic(() => import("@/components/StaggeredMenu"), {
	ssr: false,
});

const Navbar = () => {
	const menuItems = [
		{ label: "Home", ariaLabel: "Go to home section", link: "/#home" },
		{ label: "About", ariaLabel: "Go to about page", link: "/about" },
		{ label: "Projects", ariaLabel: "Go to projects page", link: "/projects" },
		{ label: "Contact", ariaLabel: "Go to contact section", link: "/#contact" },
	];

	return (
		<StaggeredMenu
			position="right"
			items={menuItems}
			displayItemNumbering={true}
			displaySocials={false}
			isFixed={true}
			topOffset="0rem"
			logoUrl="/image/logo.svg"
			menuButtonColor="#121212"
			openMenuButtonColor="#121212"
			changeMenuColorOnOpen={true}
			colors={["#f7be00", "#4f8ef7"]}
			accentColor="#f7be00"
			onMenuOpen={() => {}}
			onMenuClose={() => {}}
		/>
	);
};
export default Navbar;
