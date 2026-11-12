"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { weddingData } from "@/data/weddingData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PhotoCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const frames = framesRef.current.filter(Boolean) as HTMLDivElement[];
      const mm = gsap.matchMedia();

      // Desktop only: pinned horizontal ScrollTrigger
      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () =>
          -(track.scrollWidth - section.clientWidth);

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        frames.forEach((frame, i) => {
          const baseRotation = weddingData.gallery[i]?.rotation ?? 0;
          gsap.fromTo(
            frame,
            { rotate: baseRotation },
            {
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: tween,
                start: "left 70%",
                end: "center center",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible bg-canvas py-16 md:h-[100dvh] md:overflow-hidden md:py-0"
    >
      <div className="pointer-events-none px-5 pt-10 text-center md:absolute md:inset-x-0 md:top-12 md:z-10 md:pt-0">
        <p className="font-sans text-[0.7rem] tracking-[0.32em] text-burgundy/70 uppercase">
          Moments
        </p>
        <h2 className="mt-2 font-display text-3xl text-burgundy sm:text-4xl">
          A few frames from our story
        </h2>
      </div>

      {/* Mobile: native horizontal swipe scroller (Lenis disabled on this node) */}
      <div
        data-lenis-prevent
        className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x pt-8 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:overflow-visible md:snap-none md:pt-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-5 md:h-[100dvh] md:items-center md:px-16"
        >
          {weddingData.gallery.map((photo, index) => (
            <div
              key={photo.src}
              ref={(el) => {
                framesRef.current[index] = el;
              }}
              className="w-[78vw] max-w-[420px] shrink-0 snap-center will-change-transform sm:w-[55vw] md:w-[36vw] md:snap-align-none"
              style={{ rotate: `${photo.rotation}deg` }}
            >
              <figure className="bg-sand p-3 shadow-sm">
                <div className="relative aspect-[3/4] overflow-hidden bg-canvas">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 78vw, 36vw"
                    className="object-cover object-top"
                    draggable={false}
                  />
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
