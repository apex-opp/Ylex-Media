"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

export function ensureGsap() {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger, Flip };
