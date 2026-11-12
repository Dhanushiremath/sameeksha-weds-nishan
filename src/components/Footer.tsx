"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { FloralOrnament } from "@/components/FloralOrnament";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const payload = {
      title: weddingData.share.title,
      text: weddingData.share.text,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch {
      // Fall through to clipboard if share is cancelled or unsupported mid-flow.
    }

    try {
      await navigator.clipboard.writeText(
        `${weddingData.share.text}\n${url}`.trim(),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard may be blocked; silently ignore.
    }
  };

  return (
    <footer className="bg-burgundy px-5 py-16 text-canvas sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="font-sans text-[0.7rem] tracking-[0.3em] text-canvas/70 uppercase">
          With best compliments from
        </p>
        <p className="mt-3 max-w-xl font-display text-2xl text-canvas sm:text-3xl">
          {weddingData.hosts}
        </p>

        <div className="my-10 flex flex-col items-center gap-3">
          <FloralOrnament
            src={weddingData.ornaments.cluster}
            tone="canvas"
            className="aspect-square h-14 w-14"
          />
          <span className="font-display text-4xl tracking-[0.12em] text-gold">
            {weddingData.monogram}
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <FloralOrnament
            src={weddingData.ornaments.hearts}
            tone="canvas"
            className="aspect-[670/867] h-10 w-8 opacity-70"
          />
          <p className="font-display text-lg italic text-canvas/85">
            {weddingData.blessing}
          </p>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 border border-canvas/35 px-6 py-3 font-sans text-sm tracking-[0.14em] text-canvas uppercase transition-colors hover:bg-canvas/10"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Share2 className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Link Copied" : "Share Invitation"}
        </button>

        <p className="mt-12 font-sans text-[0.65rem] tracking-[0.22em] text-canvas/45 uppercase">
          {weddingData.bride.displayName} & {weddingData.groom.displayName} ·{" "}
          {weddingData.date.short}
        </p>
      </div>
    </footer>
  );
}
