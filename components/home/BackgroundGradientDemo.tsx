"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

interface MeteorsDemoProps {
    title?: string;
    description?: string;
    buttonText?: string;
    image?: string;
}

export function BackgroundGradientDemo({ title, description, buttonText, image }: MeteorsDemoProps) {
    return (
        <div>
            <BackgroundGradient className="rounded-[22px] max-w-xs p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <Image
                    src={image!}
                    alt="jordans"
                    height="100"
                    width="100"
                    className="object-contain"
                />

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 mb-2 ">
                    {description}
                </p>
                <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                    <span>Learn more</span>
                    <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                        &rarr;
                    </span>
                </button>
            </BackgroundGradient>
        </div>
    );
}
