"use client";
import React from "react";
import { Button } from "../ui/moving-border";

export function MovingBorderDemo({ title }: { title?: string }) {
    return (
        <div>
            <Button
                borderRadius="1.75rem"
                className="bg-white text-black border-neutral-200 "
            >
                {title || "Enter DAPP"}
            </Button>
        </div>
    );
}
