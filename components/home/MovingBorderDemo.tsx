"use client";
import React from "react";
import { Button } from "../ui/moving-border";

export function MovingBorderDemo() {
    return (
        <div>
            <Button
                borderRadius="1.75rem"
                className="bg-white  text-black  border-neutral-200 "
            >
                Enter DAPP
            </Button>
        </div>
    );
}
