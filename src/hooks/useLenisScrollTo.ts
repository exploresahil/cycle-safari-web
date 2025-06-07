'use client';

import { useCallback } from "react";
import { useLenis } from "lenis/react";

type EasingFunction = (t: number) => number;

interface ScrollToOptions {
    duration?: number;
    easing?: EasingFunction;
    offset?: number; // pixels to offset scroll position
}

// Common easing functions
const easeIn: EasingFunction = (t) => t * t;
const easeOut: EasingFunction = (t) => t * (2 - t);
const easeInOut: EasingFunction = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const linear: EasingFunction = (t) => t;

const easingMap = {
    easeIn,
    easeOut,
    easeInOut,
    linear,
};

export const useLenisScrollTo = () => {
    const lenis = useLenis();

    const scrollToId = useCallback(
        (
            id: string,
            options?: {
                duration?: number;
                easing?: keyof typeof easingMap | EasingFunction;
                offset?: number;
            }
        ) => {
            const element = document.getElementById(id);
            if (element && lenis) {
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop + (options?.offset ?? 0);

                const easing =
                    typeof options?.easing === "function"
                        ? options.easing
                        : options?.easing && easingMap[options.easing]
                            ? easingMap[options.easing]
                            : easingMap.easeInOut;

                lenis.scrollTo(targetY, {
                    duration: options?.duration ?? 1.2,
                    easing,
                });
            }
        },
        [lenis]
    );

    return scrollToId;
};
