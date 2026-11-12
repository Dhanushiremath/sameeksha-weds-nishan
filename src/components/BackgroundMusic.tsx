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
import { Volume2, VolumeX } from "lucide-react";
import { weddingData } from "@/data/weddingData";

type InvitationAudioContextValue = {
  playMusic: () => void;
  isStarted: boolean;
  isMuted: boolean;
  toggleMute: () => void;
};

const InvitationAudioContext =
  createContext<InvitationAudioContextValue | null>(null);

export function useInvitationAudio() {
  const ctx = useContext(InvitationAudioContext);
  if (!ctx) {
    throw new Error(
      "useInvitationAudio must be used within InvitationAudioProvider",
    );
  }
  return ctx;
}

export function InvitationAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingData.audio.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsStarted(true))
        .catch(() => {
          // Autoplay may still fail in rare cases; control stays hidden.
        });
    } else {
      setIsStarted(true);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    setIsMuted((prev) => {
      const next = !prev;
      if (audio) audio.muted = next;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ playMusic, isStarted, isMuted, toggleMute }),
    [playMusic, isStarted, isMuted, toggleMute],
  );

  return (
    <InvitationAudioContext.Provider value={value}>
      {children}
      <BackgroundMusicToggle />
    </InvitationAudioContext.Provider>
  );
}

function BackgroundMusicToggle() {
  const { isStarted, isMuted, toggleMute } = useInvitationAudio();

  if (!isStarted) return null;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      className="fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-burgundy text-canvas shadow-[0_10px_30px_rgba(92,22,46,0.28)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 sm:bottom-6"
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      ) : (
        <Volume2 className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
