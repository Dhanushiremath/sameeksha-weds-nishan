type FloralTone = "burgundy" | "gold" | "canvas";

const toneClass: Record<FloralTone, string> = {
  burgundy: "bg-burgundy",
  gold: "bg-gold",
  canvas: "bg-canvas",
};

type FloralOrnamentProps = {
  src: string;
  tone?: FloralTone;
  className?: string;
};

export function FloralOrnament({
  src,
  tone = "burgundy",
  className = "",
}: FloralOrnamentProps) {
  return (
    <div
      aria-hidden
      className={`${toneClass[tone]} ${className}`.trim()}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
