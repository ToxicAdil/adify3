import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowLeft, ArrowRight, Quote, X} from "lucide-react";
import {cn} from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
	name: string;
	designation: string;
	description: string;
	profileImage: string;
}

interface iCarouselProps {
	items: React.ReactElement<any>[];
	initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement | null>,
	onOutsideClick: () => void,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			onOutsideClick();
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({items, initialScroll = 0}: iCarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const {scrollLeft, scrollWidth, clientWidth} = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const handleScrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({left: -300, behavior: "smooth"});
		}
	};

	const handleScrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({left: 300, behavior: "smooth"});
		}
	};

	const handleCardClose = (index: number) => {
		if (carouselRef.current) {
			const cardWidth = isMobile() ? 230 : 384;
			const gap = isMobile() ? 4 : 8;
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		}
	};

	const isMobile = () => {
		return typeof window !== "undefined" && window.innerWidth < 768;
	};

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	return (
		<div className="relative w-full mt-10">
			<div
				className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
				ref={carouselRef}
				onScroll={checkScrollability}
			>
				<div
					className={cn(
						"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
					)}
				/>
				<div
					className={cn(
						"flex flex-row justify-start gap-4 pl-3",
						"max-w-5xl mx-auto",
					)}
				>
					{items.map((item, index) => {
						return (
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
									},
								}}
								key={`card-${index}`}
								className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
							>
								{React.cloneElement(item, {
									onCardClose: () => {
										return handleCardClose(index);
									},
								})}
							</motion.div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-end gap-2 mt-4">
				<button
					className="relative z-40 h-10 w-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary/80 transition-colors duration-200 shadow-lg"
					onClick={handleScrollLeft}
					disabled={!canScrollLeft}
				>
					<ArrowLeft className="h-6 w-6 text-white" />
				</button>
				<button
					className="relative z-40 h-10 w-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary/80 transition-colors duration-200 shadow-lg"
					onClick={handleScrollRight}
					disabled={!canScrollRight}
				>
					<ArrowRight className="h-6 w-6 text-white" />
				</button>
			</div>
		</div>
	);
};

const TestimonialCard = ({
	testimonial,
	index,
	layout = false,
	onCardClose = () => {},
	backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: {
	testimonial: iTestimonial;
	index: number;
	layout?: boolean;
	onCardClose?: () => void;
	backgroundImage?: string;
	key?: React.Key;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleExpand = () => {
		return setIsExpanded(true);
	};
	const handleCollapse = () => {
		setIsExpanded(false);
		onCardClose();
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCollapse();
			}
		};

		if (isExpanded) {
			const scrollY = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
			document.body.style.overflow = "hidden";
			document.body.dataset.scrollY = scrollY.toString();
		} else {
			const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			window.scrollTo({top: scrollY, behavior: "instant"});
		}

		window.addEventListener("keydown", handleEscapeKey);
		return () => {
			return window.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isExpanded]);

	useOutsideClick(containerRef, handleCollapse);

	return (
		<>
			<AnimatePresence>
				{isExpanded && (
					<div className="fixed inset-0 h-screen overflow-hidden z-[100] flex items-center justify-center p-4">
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							className="bg-black/60 backdrop-blur-lg h-full w-full fixed inset-0"
						/>
						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0.9}}
							ref={containerRef}
							layoutId={layout ? `card-${testimonial.name}` : undefined}
							className="max-w-3xl w-full bg-gradient-to-b from-[#f5f0ff] to-white h-auto z-[110] p-8 md:p-12 rounded-[40px] relative shadow-2xl overflow-y-auto max-h-[90vh]"
						>
							<button
								className="absolute top-6 right-6 h-10 w-10 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-colors shadow-lg"
								onClick={handleCollapse}
							>
								<X className="h-6 w-6" />
							</button>
							<motion.p
								layoutId={layout ? `category-${testimonial.name}` : undefined}
								className="text-primary/70 text-sm md:text-base font-bold uppercase tracking-widest underline underline-offset-8 decoration-primary/30"
							>
								{testimonial.designation}
							</motion.p>
							<motion.p
								layoutId={layout ? `title-${testimonial.name}` : undefined}
								className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 leading-tight"
							>
								{testimonial.name}
							</motion.p>
							<div className="py-10 text-slate-700 text-xl md:text-2xl font-medium leading-relaxed italic relative">
								<Quote className="h-10 w-10 text-primary/10 absolute -top-4 -left-4 rotate-180" />
								"{testimonial.description}"
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.button
				layoutId={layout ? `card-${testimonial.name}` : undefined}
				onClick={handleExpand}
				className="outline-none"
				whileHover={{
					rotateX: 2,
					rotateY: 2,
					rotate: 1,
					scale: 1.02,
					transition: {duration: 0.3, ease: "easeOut"},
				}}
			>
				<div
					className={`${index % 2 === 0 ? "rotate-0" : "-rotate-0"} rounded-[40px] bg-gradient-to-b from-[#f5f0ff] to-white h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-xl border border-white/50`}
				>
					<div className="absolute opacity-10" style={{inset: "-1px 0 0"}}>
						<div className="absolute inset-0">
							<img
								className="block w-full h-full object-center object-cover"
								src={backgroundImage}
								alt="Background layer"
								referrerPolicy="no-referrer"
							/>
						</div>
					</div>
					<ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
					<motion.p
						layoutId={layout ? `title-${testimonial.name}` : undefined}
						className="text-slate-800 text-xl md:text-2xl font-bold text-center [text-wrap:balance] mt-8 px-6 leading-snug"
					>
						{testimonial.description.length > 120
							? `"${testimonial.description.slice(0, 120)}..."`
							: `"${testimonial.description}"`}
					</motion.p>
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-primary text-lg md:text-xl font-bold text-center mt-6"
					>
						{testimonial.name}
					</motion.p>
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest text-center mt-2 underline underline-offset-4 decoration-primary/20"
					>
						{testimonial.designation}
					</motion.p>
				</div>
			</motion.button>
		</>
	);
};

const ProfileImage = ({src, alt}: {src: string; alt: string}) => {
	const [isLoading, setLoading] = useState(true);

	return (
		<div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] overflow-hidden rounded-full border-4 border-white shadow-2xl aspect-square flex-none relative group">
			<img
				className={cn(
					"transition duration-500 absolute top-0 inset-0 w-full h-full object-cover z-50 group-hover:scale-110",
					isLoading ? "blur-sm" : "blur-0",
				)}
				onLoad={() => {
					return setLoading(false);
				}}
				src={src}
				loading="lazy"
				decoding="async"
				alt={alt || "Profile image"}
				referrerPolicy="no-referrer"
			/>
		</div>
	);
};

// Export the components
export {Carousel, TestimonialCard, ProfileImage};
