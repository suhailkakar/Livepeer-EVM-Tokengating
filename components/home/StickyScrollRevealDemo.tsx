"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
import { TracingBeam } from "../ui/tracing-beam";

const content = [
    {
        title: "Content Moderation",
        description:
            "Ensure a safe viewing experience in real-time with our AI-driven platform. No Bananas allows streamers and audiences to enjoy content without the worry of inappropriate material. By leveraging advanced machine learning, our tool automatically identifies and censors sensitive content, fostering a more inclusive online space.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--indigo-500))] flex items-center justify-center text-white">
                Content Moderation
            </div>
        ),
    },
    {
        title: "Real-Time Censoring",
        description:
            "Watch as inappropriate content is censored instantly. Our integration of TensorFlow with Livepeer ensures that all live streams are monitored and moderated in real-time. This seamless process guarantees that all viewers enjoy a positive and safe streaming experience, free from unexpected surprises.",
        content: (
            <div className="h-full w-full flex items-center justify-center text-white">
                <Image
                    src="/real-time-censoring.webp"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="Real-time censoring demonstration"
                />
            </div>
        ),
    },
    {
        title: "Customizable Filters",
        description:
            "Gain control over what gets shown on your stream. No Bananas offers customizable filter settings, allowing streamers to define what types of content need to be censored according to their audience's preferences and community guidelines. Tailor the viewing experience to fit your brand and viewer expectations effortlessly.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--light-blue-500))] flex items-center justify-center text-white">
                Customizable Filters
            </div>
        ),
    },
    {
        title: "Community Trust",
        description:
            "Build and maintain trust with your audience by providing a consistently safe viewing environment. No Bananas helps protect your brand from the risks associated with live streaming, ensuring that your content remains appropriate for all viewers. Strengthen your community by prioritizing their safety and comfort.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--green-500),var(--lime-500))] flex items-center justify-center text-white">
                Community Trust
            </div>
        ),
    },
];
export function StickyScrollRevealDemo() {
    return (
        <div className="">
            <StickyScroll content={content} />
        </div>
    );
}
