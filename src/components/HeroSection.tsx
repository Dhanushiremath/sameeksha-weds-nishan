"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { weddingData } from "@/data/weddingData";
import { FloralOrnament } from "@/components/FloralOrnament";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floralLeftRef = useRef<HTMLDivElement>(null);
  const floralRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const image = imageWrapRef.current;
      const text = textRef.current;
      if (!image || !text) return;

      gsap.fromTo(
        image,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(text, {
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (floralLeftRef.current) {
        gsap.to(floralLeftRef.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (floralRightRef.current) {
        gsap.to(floralRightRef.current, {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-canvas px-5 py-16 sm:px-8"
    >
      {/* Atmospheric washes */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -top-24 -left-16 h-[70%] w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(234,224,213,0.85),transparent_68%)]" />
        <div className="absolute -right-20 -bottom-28 h-[65%] w-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,22,46,0.08),transparent_70%)]" />
        <div className="absolute right-[10%] bottom-[18%] h-[40%] w-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,151,88,0.12),transparent_70%)]" />
      </div>

      {/* Paper grain */}
      <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden />

      {/* Editorial inset frame */}
      <div
        className="pointer-events-none absolute inset-4 border border-burgundy/15 sm:inset-6"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-5 border border-gold/25 sm:inset-7"
        aria-hidden
      />

      {/* Rose watermarks */}
      <div
        ref={floralLeftRef}
        className="pointer-events-none absolute top-[6%] left-[-2%] z-[1] opacity-[0.12] will-change-transform sm:left-[2%] sm:opacity-[0.14]"
        aria-hidden
      >
        <FloralOrnament
          src={weddingData.ornaments.stems}
          tone="gold"
          className="aspect-[4/5] h-40 w-32 sm:h-52 sm:w-40 lg:h-60 lg:w-48"
        />
      </div>
      <div
        ref={floralRightRef}
        className="pointer-events-none absolute right-[-4%] bottom-[4%] z-[1] -scale-x-100 opacity-[0.11] will-change-transform sm:right-[1%] sm:opacity-[0.13]"
        aria-hidden
      >
        <FloralOrnament
          src={weddingData.ornaments.bouquet}
          tone="burgundy"
          className="aspect-square h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60"
        />
      </div>

      {/* Floating heart accents */}
      <div
        className="pointer-events-none absolute top-[38%] left-[4%] z-[1] opacity-[0.1] sm:left-[6%] sm:opacity-[0.11]"
        aria-hidden
      >
        <div className="heart-float">
          <FloralOrnament
            src={weddingData.ornaments.hearts}
            tone="gold"
            className="aspect-[670/867] h-28 w-20 sm:h-36 sm:w-28"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute top-[22%] right-[5%] z-[1] -scale-x-100 opacity-[0.1] sm:right-[8%] sm:opacity-[0.11]"
        aria-hidden
      >
        <div className="heart-float heart-float-delay-1">
          <FloralOrnament
            src={weddingData.ornaments.hearts}
            tone="burgundy"
            className="aspect-[670/867] h-24 w-[4.5rem] sm:h-32 sm:w-24"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-[12%] left-1/2 z-[1] -translate-x-1/2 opacity-[0.08]"
        aria-hidden
      >
        <div className="heart-float heart-float-delay-2">
          <FloralOrnament
            src={weddingData.ornaments.hearts}
            tone="gold"
            className="aspect-[670/867] h-20 w-16"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div ref={textRef} className="order-1 text-center will-change-transform lg:order-2 lg:pt-8 lg:text-left">
          <p className="font-sans text-[0.65rem] tracking-[0.35em] text-burgundy/70 uppercase sm:text-[0.7rem]">
            {weddingData.invocation}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] font-medium text-burgundy sm:mt-5">
            {weddingData.bride.displayName}
            <span className="mx-2 font-display text-[clamp(1.4rem,3vw,2rem)] font-normal tracking-[0.2em] text-gold italic lg:mx-0 lg:block">
              &
            </span>
            {weddingData.groom.displayName}
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent lg:mx-0 lg:from-gold lg:to-transparent" />
          <FloralOrnament
            src={weddingData.ornaments.cluster}
            tone="burgundy"
            className="mx-auto mt-4 aspect-square h-12 w-12 lg:mx-0"
          />
          <p className="mt-4 font-display text-xl text-ink/85 sm:mt-5 sm:text-3xl">
            {weddingData.date.short}
          </p>
          <p className="mt-1 font-sans text-xs tracking-[0.18em] text-ink/55 uppercase sm:mt-2 sm:text-sm">
            {weddingData.date.weekday} · 11:15 AM
          </p>
        </div>

        <div
          ref={imageWrapRef}
          className="relative order-2 mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] rounded-b-[1.25rem] border border-burgundy/20 bg-sand p-2 shadow-[0_24px_60px_rgba(44,34,36,0.12)] will-change-transform sm:max-w-md lg:order-1 lg:max-w-none"
          style={{
            borderTopLeftRadius: "48% 18%",
            borderTopRightRadius: "48% 18%",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] rounded-b-[0.9rem] bg-sand">
            <Image
              src={weddingData.hero.src}
              alt={weddingData.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
