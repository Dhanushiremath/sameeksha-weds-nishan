"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollContextValue = {
  isLocked: boolean;
  unlockScroll: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    lenis.stop();
    document.documentElement.classList.add("lenis-stopped");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis-stopped");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const unlockScroll = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    document.documentElement.classList.remove("lenis-stopped");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lenis.start();
    setIsLocked(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const value = useMemo(
    () => ({ isLocked, unlockScroll }),
    [isLocked, unlockScroll],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
