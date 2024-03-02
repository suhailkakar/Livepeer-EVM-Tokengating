"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
    const words = [
        {
            text: "Bringing",
        },
        {
            text: "back",
        },
        {
            text: "fun,",
        },
        {
            text: "safe,",
        },
        {
            text: "livestreams",
        },
        {
            text: "with",
        },
        {
            text: "N🚫",
            className: "text-red-500 dark:text-red-500",
        },
        {
            text: "Bananas",
            className: "text-yellow-500 dark:text-yellow-500",
        },
        {
            text: "🍌",
        }
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <TypewriterEffectSmooth words={words} />
        </div>
    );
}
