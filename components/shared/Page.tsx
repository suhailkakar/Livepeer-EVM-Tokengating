import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-white h-screen">{children}</div>;
}
