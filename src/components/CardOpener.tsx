"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { weddingData } from "@/data/weddingData";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { useInvitationAudio } from "@/components/BackgroundMusic";
import { FloralOrnament } from "@/components/FloralOrnament";

gsap.registerPlugin(useGSAP);

export function CardOpener() {
  const { unlockScroll } = useSmoothScroll();
  const { playMusic } = useInvitationAudio();
  const rootRef = useRef<HTMLDivElement>(null);
  const topFlapRef = useRef<HTMLDivElement>(null);
  const bottomFlapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const openingRef = useRef(false);

  useGSAP(
    () => {
      gsap.set([topFlapRef.current, bottomFlapRef.current], {
        transformOrigin: "center center",
      });
    },
    { scope: rootRef },
  );

  const handleOpen = () => {
    if (openingRef.current || isOpen) return;
    openingRef.current = true;
    playMusic();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsOpen(true);
        unlockScroll();
        setIsGone(true);
      },
    });

    tl.to(sealRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    })
      .to(
        contentRef.current,
        {
          opacity: 0,
          y: -12,
          duration: 0.4,
        },
        "<0.05",
      )
      .to(
        topFlapRef.current,
        {
          yPercent: -105,
          rotateX: -8,
          duration: 1.2,
        },
        "-=0.1",
      )
      .to(
        bottomFlapRef.current,
        {
          yPercent: 105,
          rotateX: 8,
          duration: 1.2,
        },
        "<",
      )
      .to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25",
      );
  };

  if (isGone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden [perspective:1400px]"
      aria-hidden={isOpen}
    >
      <div
        ref={topFlapRef}
        className="absolute inset-x-0 top-0 z-[1] h-1/2 origin-bottom bg-canvas will-change-transform"
        style={{
          boxShadow: "inset 0 -1px 0 color-mix(in srgb, var(--gold) 35%, transparent)",
        }}
      >
        <div className="pointer-events-none absolute inset-3 border border-burgundy/70" />
        <div className="pointer-events-none absolute inset-[14px] border border-gold/55" />
      </div>

      <div
        ref={bottomFlapRef}
        className="absolute inset-x-0 bottom-0 z-[1] h-1/2 origin-top bg-canvas will-change-transform"
        style={{
          boxShadow: "inset 0 1px 0 color-mix(in srgb, var(--gold) 35%, transparent)",
        }}
      >
        <div className="pointer-events-none absolute inset-3 border border-burgundy/70" />
        <div className="pointer-events-none absolute inset-[14px] border border-gold/55" />
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-1/2 flex-col items-center justify-center px-6 pt-[4dvh] text-center"
      >
        <FloralOrnament
          src={weddingData.ornaments.stems}
          tone="gold"
          className="aspect-[4/5] h-14 w-11 sm:h-16 sm:w-12"
        />
        <p className="mt-3 font-display text-sm tracking-[0.35em] text-burgundy/80 uppercase">
          {weddingData.monogram}
        </p>
        <div className="mt-3 mb-3 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <h1 className="font-display text-[clamp(2.35rem,7.5vw,4.25rem)] leading-[0.95] font-medium text-burgundy">
          <span className="block">{weddingData.bride.displayName}</span>
          <span className="mt-1 block font-display text-[clamp(1.35rem,3.5vw,2rem)] font-normal tracking-[0.18em] text-gold italic">
            &
          </span>
          <span className="mt-1 block">{weddingData.groom.displayName}</span>
        </h1>
        <p className="mt-3 font-sans text-xs tracking-[0.28em] text-ink/60 uppercase">
          Wedding Invitation
        </p>
      </div>

      <div className="absolute inset-0 z-20 flex items-end justify-center pb-[max(4rem,12dvh)] sm:items-center sm:pb-0 sm:pt-[28dvh]">
        <button
          ref={sealRef}
          type="button"
          onClick={handleOpen}
          className="group relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-burgundy text-canvas shadow-[0_12px_40px_rgba(92,22,46,0.28)] transition-transform duration-300 will-change-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:scale-95"
          aria-label={weddingData.opener.cta}
        >
          <span
            className="pointer-events-none absolute inset-[6px] rounded-full border border-gold/70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-[11px] rounded-full border border-canvas/25"
            aria-hidden
          />
          <span className="relative px-3 text-center font-display text-[0.95rem] leading-tight tracking-[0.08em] uppercase">
            {weddingData.opener.cta}
          </span>
        </button>
      </div>
    </div>
  );
}
