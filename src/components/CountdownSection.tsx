"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CalendarPlus } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { FloralOrnament } from "@/components/FloralOrnament";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function serializeTimeLeft(time: TimeLeft) {
  return `${time.days}:${time.hours}:${time.minutes}:${time.seconds}`;
}

function parseTimeLeft(value: string): TimeLeft | null {
  if (value === "pending") return null;
  const [days, hours, minutes, seconds] = value.split(":").map(Number);
  return { days, hours, minutes, seconds };
}

function subscribeToSecond(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function toICSDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function buildICS() {
  const { bride, groom, venue, date, share } = weddingData;
  const uid = `sameeksha-nishan-${date.countdownTargetISO}@wedding`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sameeksha & Nishan//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(date.countdownTargetISO)}`,
    `DTEND:${toICSDate(date.calendarEndISO)}`,
    `SUMMARY:${bride.displayName} & ${groom.displayName} Wedding`,
    `DESCRIPTION:${share.text}`,
    `LOCATION:${venue.name}, ${venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildGoogleCalendarUrl() {
  const { bride, groom, venue, date, share } = weddingData;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${bride.displayName} & ${groom.displayName} Wedding`,
    dates: `${toICSDate(date.countdownTargetISO)}/${toICSDate(date.calendarEndISO)}`,
    details: share.text,
    location: `${venue.name}, ${venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection() {
  const targetMs = useMemo(
    () => new Date(weddingData.date.countdownTargetISO).getTime(),
    [],
  );
  const snapshot = useSyncExternalStore(
    subscribeToSecond,
    () => serializeTimeLeft(getTimeLeft(targetMs)),
    () => "pending",
  );
  const timeLeft = parseTimeLeft(snapshot);

  const downloadICS = () => {
    const blob = new Blob([buildICS()], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sameeksha-nishan-wedding.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-sand px-5 py-20 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-burgundy/25 to-transparent" />
      <div className="mx-auto max-w-5xl text-center">
        <FloralOrnament
          src={weddingData.ornaments.bouquet}
          tone="gold"
          className="mx-auto mb-5 aspect-square h-10 w-10"
        />
        <p className="font-sans text-[0.7rem] tracking-[0.32em] text-burgundy/70 uppercase">
          Counting down to
        </p>
        <h2 className="mt-3 font-display text-3xl text-burgundy sm:text-4xl">
          {weddingData.date.display}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="font-display text-[clamp(2.75rem,8vw,4.5rem)] leading-none tabular-nums text-burgundy">
                {typeof unit.value === "number" ? pad(unit.value) : "--"}
              </span>
              <span className="mt-3 font-sans text-[0.65rem] tracking-[0.28em] text-ink/55 uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={downloadICS}
            className="inline-flex items-center gap-2 border border-burgundy bg-burgundy px-6 py-3 font-sans text-sm tracking-[0.12em] text-canvas uppercase transition-colors hover:bg-burgundy/90"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden />
            Add to Calendar
          </button>
          <a
            href={buildGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-burgundy/40 bg-transparent px-6 py-3 font-sans text-sm tracking-[0.12em] text-burgundy uppercase transition-colors hover:border-burgundy hover:bg-canvas/50"
          >
            Google Calendar
          </a>
        </div>
      </div>
    </section>
  );
}
