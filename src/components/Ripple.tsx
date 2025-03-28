import React, { useState, useCallback, useEffect, useRef, JSX } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export type Nullable<T> = T | null;

const rippleVariants = cva(
  "pointer-events-none absolute animate-ripple rounded-full opacity-50",
  {
    variants: {
      color: {
        primary: "bg-primary-300 data-[mode=dark]:bg-primary-800",
        foreground: "bg-gray-300 data-[mode=dark]:bg-gray-800",
        gray: "bg-gray-300 data-[mode=dark]:bg-gray-800",
        success: "bg-success-300 data-[mode=dark]:bg-success-800",
        warning: "bg-warning-300 data-[mode=dark]:bg-warning-800",
        error: "bg-error-300 data-[mode=dark]:bg-error-800",
      },
    },
  }
);

interface RippleEffectProps extends VariantProps<typeof rippleVariants> {
  duration?: number;
  className?: string;
  mode: "light" | "dark";
  containerRef: React.RefObject<Nullable<HTMLButtonElement>>;
}

const MINIMUM_RIPPLE_SIZE = 100;

export function RippleEffect({
  mode,
  color,
  className,
  containerRef,
  duration = 700,
}: RippleEffectProps) {
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<JSX.Element[]>([]);

  const showRipple = useCallback(
    (event: MouseEvent) => {
      if (containerRef?.current && rippleContainerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        const rippleSize = Math.min(
          containerRef.current.clientHeight,
          containerRef.current.clientWidth,
          MINIMUM_RIPPLE_SIZE
        );

        const newRipple = (
          <div
            data-mode={mode}
            className={cn(
              rippleVariants({
                color,
                className,
              })
            )}
            style={{
              width: rippleSize,
              height: rippleSize,
              left: x - rippleSize / 2,
              top: y - rippleSize / 2,
              animationDuration: `${duration}ms`,
            }}
            key={Date.now()}
          />
        );

        setRipples((prevRipples) => [...prevRipples, newRipple]);
        setTimeout(
          () =>
            setRipples((prevRipples) =>
              prevRipples.filter((ripple) => ripple !== newRipple)
            ),
          duration - 50
        );
      }
    },
    [className, color, containerRef, duration, mode]
  );

  useEffect(() => {
    const button = containerRef.current;

    if (button) {
      button.addEventListener("click", showRipple);

      return () => {
        button.removeEventListener("click", showRipple);
      };
    }
  }, [containerRef, showRipple]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[inherit] transform-gpu"
      ref={rippleContainerRef}
    >
      {ripples}
    </div>
  );
}
