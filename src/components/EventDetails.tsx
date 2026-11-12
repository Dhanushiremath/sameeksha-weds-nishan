"use client";

import Image from "next/image";
import { Compass, MapPin } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { FloralOrnament } from "@/components/FloralOrnament";

export function EventDetails() {
  const { events, venue, bride, groom } = weddingData;

  return (
    <section className="relative bg-sand px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <FloralOrnament
            src={weddingData.ornaments.bouquet}
            tone="burgundy"
            className="mb-4 aspect-square h-11 w-11"
          />
          <p className="font-sans text-[0.7rem] tracking-[0.32em] text-burgundy/70 uppercase">
            The Day
          </p>
          <h2 className="mt-3 font-display text-3xl text-burgundy sm:text-4xl">
            Event itinerary
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-ink/65">
            With the blessings of our beloved family and friends, we joyfully
            invite you to the wedding of {bride.formalName} and{" "}
            {groom.formalName}.
          </p>

          <ol className="mt-10 space-y-0 border-l border-gold/60 pl-6">
            {events.map((event, index) => (
              <li key={event.id} className="relative pb-10 last:pb-0">
                <span
                  className="absolute top-1.5 -left-[1.91rem] flex h-3.5 w-3.5 items-center justify-center rounded-full border border-burgundy bg-canvas"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
                </span>
                <p className="font-sans text-[0.65rem] tracking-[0.24em] text-gold uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl text-burgundy">
                  {event.title}
                </h3>
                <p className="mt-1 font-display text-xl text-ink/80">
                  {event.time}
                  {event.description ? (
                    <span className="text-ink/50"> · {event.description}</span>
                  ) : null}
                </p>
                <p className="mt-3 font-sans text-sm text-ink/60">
                  {venue.name}
                  <br />
                  {venue.address}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-4 border-t border-burgundy/10 pt-8">
            <div>
              <p className="font-sans text-[0.65rem] tracking-[0.22em] text-burgundy/60 uppercase">
                Bride
              </p>
              <p className="mt-1 font-display text-lg text-ink">
                {bride.formalName}
              </p>
              <p className="font-sans text-sm text-ink/55">{bride.parentage}</p>
            </div>
            <div>
              <p className="font-sans text-[0.65rem] tracking-[0.22em] text-burgundy/60 uppercase">
                Groom
              </p>
              <p className="mt-1 font-display text-lg text-ink">
                {groom.formalName}
              </p>
              <p className="font-sans text-sm text-ink/55">{groom.parentage}</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-stretch">
          <div className="relative flex w-full flex-col justify-between overflow-hidden border border-burgundy/20 bg-canvas p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-4 border border-gold/40" />
            <div className="pointer-events-none absolute inset-6 border border-burgundy/15" />

            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-burgundy">
                <Compass className="h-6 w-6" strokeWidth={1.25} aria-hidden />
              </div>
              <p className="font-sans text-[0.7rem] tracking-[0.28em] text-burgundy/70 uppercase">
                Venue
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-burgundy">
                {venue.name}
              </h3>
              <p className="mt-3 flex items-start gap-2 font-sans text-sm text-ink/65">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden
                />
                <span>{venue.address}</span>
              </p>
            </div>

            <div className="relative my-8 overflow-hidden">
              <div className="relative mx-auto aspect-[1024/630] w-full max-w-md">
                <Image
                  src={venue.illustration}
                  alt={`${venue.name} illustration`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-contain object-center"
                />
              </div>
            </div>

            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-full items-center justify-center bg-burgundy px-6 py-4 font-sans text-sm tracking-[0.16em] text-canvas uppercase transition-opacity hover:opacity-90"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
