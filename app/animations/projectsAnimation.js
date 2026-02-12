import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
  if (!container) return;

  const projects = gsap.utils.toArray(".project");
  if (!projects.length) return;

  const totalWidth = container.scrollWidth;
  const viewportWidth = window.innerWidth;

  // Extra empty space on the right so the last project
  // doesn't sit flush against the viewport edge
  const extraRightSpace = 64; // px, tweak as desired

  // How far we need to slide so the last card lines up nicely
  const maxTranslate = Math.max(0, totalWidth - viewportWidth + extraRightSpace);

  gsap.to(container, {
    x: -maxTranslate,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "center center",
      pin: true,
      scrub: 1,
    },
  });
}