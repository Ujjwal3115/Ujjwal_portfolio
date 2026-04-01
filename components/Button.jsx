import { CircleArrowUp } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";

const Button = ({ children, variation = "primary", className = "", ...props }) => {
	const childArray = Children.toArray(children);
	const child = childArray.length === 1 && isValidElement(childArray[0]) ? childArray[0] : null;
	const isLinkLike =
		isValidElement(child) &&
		(typeof child.type === "string" ? child.type === "a" : !!child.props?.href);

	const baseClassName = `title group relative mr-3 mt-2 inline-flex items-center justify-between overflow-hidden border px-7 py-2.5 rounded-2xl shadow-md sm:rounded-full sm:px-7 sm:py-3.5 text-sm font-semibold transition-all duration-300 ease-in-out sm:text-lg ${
		variation === "primary"
			? "border-transparent bg-black text-gray-100 hover:bg-transparent hover:border-black hover:text-gray-700 sm:bg-zinc-800 sm:text-zinc-100 sm:hover:bg-black sm:hover:text-zinc-100 sm:hover:border-transparent"
			: "border-black bg-transparent text-gray-700 hover:bg-black hover:border-transparent hover:text-gray-100"
	} ${className}`;

	const content = (
		<>
			<span className="relative z-10">{isLinkLike ? child.props.children : children}</span>
			<span className="pointer-events-none relative ml-3 hidden h-6 w-6 items-center justify-center sm:flex sm:h-7 sm:w-7">
				<div className="absolute h-2 w-2 rounded-full bg-current transition-all duration-300 ease-in-out group-hover:scale-0 group-hover:opacity-0 " />
				<CircleArrowUp className="absolute h-6 w-6 rotate-180 scale-0 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-150 group-hover:rotate-45 group-hover:opacity-100 sm:h-7 sm:w-7 group-hover:-mr-3" />
			</span>
		</>
	);

	if (isLinkLike) {
		return cloneElement(child, {
			...props,
			className: `${baseClassName} ${child.props.className ?? ""}`.trim(),
			children: content,
		});
	}

	return (
		<button {...props} className={baseClassName}>
			{content}
		</button>
	);
};

export default Button;