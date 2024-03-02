import Image from "next/image";
import React, { useState } from "react";
import { Button, Page, Modal, Nav } from "./index";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [onInputChange, setOnInputChange] = useState("");
  return (
    <>
      <Nav />
      <section className="relative py-24 sm:py-16 lg:pt-44 lg:pb-32 bg-white md:max-w-6xl md:mx-auto md:px-0 px-6">
        <div className="w-full mx-auto sm:px-6 lg:px-0">
          <div className="flex flex-col-reverse md:flex-row mx-auto lg:items-center gap-y-12 lg:gap-x-8">
            <div className="">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-sans font-medium leading-tight text-black sm:text-5xl sm:leading-tight lg:leading-tight lg:text-5xl font-sams">
                  Bringing back fun, safe, livestreams with{' '}
                  <span
                    style={{ color: "#FFA800" }}
                  >
                    N
                    <span className="md:text-5xl">
                      🚫{' '}
                    </span>
                    Bananas 🍌
                  </span>
                </h1>
                <p className="hidden md:block mt-2 md:text-lg text-gray-400 sm:mt-4 font-sans">
                  No Bananas brings groundbreaking moderation to ensure live streams are safe and inclusive for everyone.
                </p>
              </div>
              <div className="mt-4 md:mt-8 text-center lg:text-left flex gap-2">
                <Button
                  to="/create"
                  className="bg-primary border-primary text-background md:px-10 py-3 md:py-4 hover:border-primary hover:text-primary hover:bg-background w-full text-sm md:text-base"
                >
                  Discover How
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  className="border-primary md:px-10 py-3 md:py-4 text-primary hover:bg-primary hover:text-background w-full text-sm md:text-base"
                >
                  Watch stream
                </Button>
              </div>
            </div>
            <div className="">
              <Image
                className="object-cover"
                src="/assets/BANANA2.gif"
                width={1500}
                height={1500}
                alt="banana"
              />
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onInputChange={(e) => setOnInputChange(e.target.value)}
          onSubmit={() => {
            window.location.href = `/watch/${onInputChange}`;
          }}
        />
      )}
    </>
  );
}
