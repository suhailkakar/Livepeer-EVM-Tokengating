import Image from "next/image";
import React, { useState } from "react";
import { Button, Page, Modal, Nav } from "./index";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [onInputChange, setOnInputChange] = useState("");
  return (
    <Page>
      <Nav />
      <section className="relative py-12 sm:py-16 lg:py-20 lg:pb-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-8">
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-sans font-medium leading-tight text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-sams">
                  Control who can watch your live streams
                </h1>
                <p className="mt-2 text-lg text-gray-400 sm:mt-8 font-sans">
                  A demo application that demonstrates how to use the Livepeer
                  to create token gating live streams with Aptos.
                </p>
              </div>
              <div className="mt-8 text-center lg:text-left flex flex-col md:flex-row ">
                <Button
                  to="/create"
                  text="text-xl"
                  className="bg-primary border-primary text-background px-10 py-4 hover:border-primary hover:text-primary hover:bg-background"
                >
                  Set up stream
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  text="text-xl"
                  className="border-primary px-10 py-4 text-primary md:ml-8 hover:bg-primary hover:text-background mt-3 md:mt-0"
                >
                  Watch stream
                </Button>
              </div>
            </div>
            <div className="w-full h-100 relative pb-[100%] md:ml-8">
              <Image
                className="hero-image"
                src="/assets/hero.png"
                layout="fill"
                alt="Aptos Logo"
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
    </Page>
  );
}
