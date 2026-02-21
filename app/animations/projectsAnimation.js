import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
  if (!container) return;

  const projects = gsap.utils.toArray(".project");
  if (!projects.length) return;

  const totalWidth = container.scrollWidth;
  const viewportWidth = window.innerWidth;

  // Space so the last card is fully in view (card width ~500px + padding)
  const extraRightSpace = 520;

  const maxTranslate = Math.max(0, totalWidth - viewportWidth + extraRightSpace);

  gsap.to(container, {
    x: -maxTranslate,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "center center",
      end: () => `+=${window.innerHeight * 1.5}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
    },
  });

  return () => ScrollTrigger.refresh();
}