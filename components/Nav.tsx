import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <header className="relative py-4 md:py-6">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="hover:cursor-pointer">
              <Image
                src={"/assets/livepeer-logo.png"}
                alt="Livepeer Logo"
                width={100}
                height={50}
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
            <Link
              href="/"
              className="text-base font-regular text-black transition-all duration-200 rounded focus:outline-none font-sans hover:text-opacity-50 "
            >
              Home
            </Link>
            <Link
              href="https://livepeerjs.org"
              className="text-base font-regular text-black transition-all duration-200 rounded focus:outline-none font-sans hover:text-opacity-50 "
            >
              Livepeer.js
            </Link>
            <Link
              href="https://livepeer.studio"
              className="text-base font-regular text-black transition-all duration-200 rounded focus:outline-none font-sans hover:text-opacity-50 "
            >
              Livepeer Studio
            </Link>
            <Link
              href="https://github.com/suhailkakar/Livepeer-EVM-Tokengating"
              className="text-base font-regular text-black transition-all duration-200 rounded focus:outline-none font-sans hover:text-opacity-50 "
            >
              GitHub Repo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
