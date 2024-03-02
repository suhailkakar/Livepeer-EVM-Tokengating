import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'
import { MovingBorderDemo } from './home/MovingBorderDemo';
import { ConnectKitButton } from "connectkit";


const DropdownMenu = () => {
  return (
    <div className="block md:absolute bg-white/10 text-black z-30 py-2 w-48 rounded-lg md:shadow-xl text-left mt-2 md:mt-0 transition-all ease-in-out">
      <Link href='/host' className="block md:px-4 p-2 text-sm text-black menu-item-hover ">Host a node</Link>
      <Link href='/rent' className="block md:px-4 p-2 text-sm text-black menu-item-hover ">Rent a node</Link>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    }
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      display: 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      display: 'block',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='fixed w-full top-0 z-50 bg-white px-4 lg:px-8'>
      <div className='w-full h-20 flex items-center'>
        <div className={`flex items-center w-full justify-between max-w-6xl md:mx-auto md:px-2  ,md:mr-6 md:mr-aut transition-all duration-500 ${hasScrolled ? 'bg-white' : 'bg-transparent'} rounded-full`}>
          <Link
            href={'/'}
            className='cursor-pointer transition-all duration-300 flex items-center gap-1.5'
          >
            <h1 className="text-black text-lg md:text-2xl"
              style={{ background: 'linear-gradient(94deg, #E52200 0%, #FFA800 100%)', color: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}
            >N🚫 Bananas {' '}</h1>
            <span className='md:text-3xl'>🍌</span>
          </Link>
          <div className="relative">
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`relative w-10 h-10 flex justify-center items-center ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="hamburger"></div>
              </button>
            </div>
            {/* mobile menu */}
            <AnimatePresence mode='wait'>
              {isMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className={`absolute z-50 top-full right-0 mt-4 w-screen max-w-[300px] bg-gray-950/90 backdrop-blur-lg p-5 rounded-lg border border-white/10 md:hidden`}
                >
                  <ul className="flex flex-col items-start gap-4 text-black">
                    {/* <li
                      className="cursor-pointer transition-all duration-300  text-black"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span className='menu-item-hover'>
                        Services
                      </span>
                      {isDropdownOpen && <DropdownMenu />}
                    </li> */}
                    <li
                      onClick={() => scrollToSection('features')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Home</li>
                    <li
                      onClick={() => scrollToSection('pricing')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">How it Works</li>
                    <li
                      onClick={() => scrollToSection('participate')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Features</li>
                    <li
                      onClick={() => scrollToSection('roadmap')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Success stories</li>
                    <li
                      onClick={() => scrollToSection('use-cases')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Use cases</li>
                    <li
                      onClick={() => scrollToSection('faq')}
                      className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">FAQ</li>
                    {/* inverted dapp button */}
                    <MovingBorderDemo />
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            {/* desktop menu */}
            <ul className="hidden md:flex items-center gap-6 text-black md:ml-16 w-full">
              {/* <li
                className="cursor-pointer transition-all duration-300 relative"
                onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <span className='text-black menu-item-hover'>
                  Services
                </span>
                {isDropdownOpen && <DropdownMenu />}
              </li> */}
              <li
                onClick={() => scrollToSection('features')}
                className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Home</li>
              <li
                onClick={() => scrollToSection('pricing')}
                className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">How it Works</li>
              <li
                onClick={() => scrollToSection('participate')}
                className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Features</li>
              <li
                onClick={() => scrollToSection('roadmap')}
                className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">Success stories</li>

              <li
                onClick={() => scrollToSection('faq')}
                className="cursor-pointer transition-all duration-300 menu-item-hover hover:text-black">FAQ</li>
            </ul>
          </div>
          <Link href='/create' className="">
            {/* <MovingBorderDemo /> */}
            {/* <w3m-button /> */}
            <ConnectKitButton />
          </Link>
        </div>
      </div>
      <div className='bg-white/5 max-w-5xl mx-auto' style={{
        height: "1px",
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 1.71%, rgba(255, 255, 255, 0.09) 17.3%, rgba(255, 255, 255, 0.24) 47.99%, rgba(255, 255, 255, 0.18) 55.52%, rgba(255, 255, 255, 0.13) 85.09%, rgba(255, 255, 255, 0.00) 99.56%)'
      }}
      />
    </div>
  );
}

export default Navbar