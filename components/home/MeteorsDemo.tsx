import React from "react";
import { Meteors } from "../ui/meteors";

interface MeteorsDemoProps {
    title?: string;
    description?: string;
    buttonText?: string;
}

export function MeteorsDemo({ title, description, buttonText }: MeteorsDemoProps) {
    return (
        <>
            <div className="w-full relative max-w-xs border-none">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#F9D12C] to-[#FFF2A2] transform scale-[0.80]  bg-red-500 rounded-full blur-3xl"
                />
                <div className="relative shadow-xl bg-gradient-to-br from-[#FFF2A2] to-[#FFFDF3] border px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start"
                >
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-2 w-2 text-gray-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                            />
                        </svg>
                    </div>

                    <h1 className="font-bold text-xl text-black mb-4 relative z-30">
                        {title}
                    </h1>

                    <p className="font-normal text-base text-slate-900 mb-4 relative z-30">
                        {description}
                    </p>

                    {/* <button className="border px-4 py-1 rounded-lg  border-gray-700 text-gray-800">
                        Explore
                    </button> */}

                    {/* Meaty part - Meteor effect */}
                    <Meteors number={20} />
                </div>
            </div>
        </>
    );
}
