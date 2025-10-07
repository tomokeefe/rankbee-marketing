import { type ElementType, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "./ui/utils";

type BlurTextDirection = "top" | "bottom";
type BlurTextMode = "words" | "characters";

type Snapshot = Record<string, string | number>;

type BlurTextProps = {
  text: string;
  delay?: number;
  className?: string;
  as?: ElementType;
  animateBy?: BlurTextMode;
  direction?: BlurTextDirection;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (fromSnapshot: Snapshot, snapshots: Snapshot[]) => {
  const keys = new Set([
    ...Object.keys(fromSnapshot),
    ...snapshots.flatMap((snapshot) => Object.keys(snapshot)),
  ]);

  const keyframes: Record<string, Array<string | number | undefined>> = {};

  keys.forEach((key) => {
    keyframes[key] = [fromSnapshot[key], ...snapshots.map((snapshot) => snapshot[key])];
  });

  return keyframes;
};

export function BlurText({
  text,
  delay = 200,
  className,
  as: Component = "p",
  animateBy = "characters",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observerTarget = containerRef.current;

    if (!observerTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(observerTarget);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(observerTarget);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<Snapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo<Snapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const segments = useMemo(() => {
    const delimiter = animateBy === "words" ? " " : "";
    const rawSegments = delimiter === "" ? text.split("") : text.split(delimiter);

    if (animateBy === "words") {
      return rawSegments;
    }

    return rawSegments.reduce<string[]>((accumulator, segment, index) => {
      accumulator.push(segment);

      if (delimiter === "" && segment === "" && index < text.length - 1) {
        accumulator.push(" ");
      }

      return accumulator;
    }, []);
  }, [animateBy, text]);

  const animatedSegments = useMemo(
    () => segments.filter((segment) => segment !== "\n"),
    [segments]
  );

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = useMemo(
    () => Array.from({ length: stepCount }, (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1))),
    [stepCount]
  );

  let animatedIndex = -1;
  const lastAnimatedIndex = animatedSegments.length - 1;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment, index) => {
        if (segment === "\n") {
          return <span key={`line-break-${index}`} className="basis-full h-0" aria-hidden="true" />;
        }

        animatedIndex += 1;

        if (segment === "") {
          return null;
        }

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (animatedIndex * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={`segment-${index}`}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              animatedIndex === lastAnimatedIndex ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
        );
      })}
    </Component>
  );
}
