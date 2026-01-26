"use client";

// import { useState } from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { useState, useEffect } from "react";

// Usage
// <TypewriterText text="This is being written automatically!" />

export default function Example(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const { scrollY } = useScroll();

  // useMotionValueEvent is the most performant way to listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 1. Get the height of the viewport (the Hero section height)
    const heroHeight = window.innerHeight;
    
    // 2. If we have scrolled past 90% of the hero, switch the theme
    // We use 90% so the color change starts just before the white page hits the top
    if (latest > heroHeight * 0.98) {
      
      console.log(latest, heroHeight);
      setIsWhiteTheme(true);
    } else {
      setIsWhiteTheme(false);
    }
  });

  return (
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isWhiteTheme
            ? "rgba(255, 255, 255, 1)"
            : "rgba(0, 0, 0, 0)",
          color: isWhiteTheme ? "#000000" : "#ffffff",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px"

        }}
        transition={{ duration: 0.5 }}
        className={`sticky z-50  inset-x-0 top-0 ${props.white ? "bg-white text-black" : ""}`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm/6 font-semibold text-${isWhiteTheme ? "black" : "white"}`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <NavLink to="/login">
            <button className={`text-sm/6 font-semibold text-${isWhiteTheme ? "black" : "white"}`}>
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
            </NavLink>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <NavLink
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </NavLink>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </motion.nav>
  );
}

// const Navbar = () => {

//   return (
//
//       <div className="text-2xl font-bold tracking-tighter">CARGOKITE</div>

//       <div className="flex gap-8 font-medium text-sm uppercase tracking-widest">
//         <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
//         <a href="#services" className="hover:opacity-50 transition-opacity">Services</a>
//         <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
