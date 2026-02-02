"use client";

// import { useState } from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { useState, useContext } from "react";

// Usage
// <TypewriterText text="This is being written automatically!" />

export default function Example() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigation = [
    { name: "Map", href: "/map" },
    { name: "Government", href: "/govdashboard" + (isAuthenticated ? `/${user}` : "/null") },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const { scrollY } = useScroll();

  // useMotionValueEvent is the most performant way to listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 1. Get the height of the viewport (the Hero section height)
    const heroHeight = window.innerHeight;

    // 2. If we have scrolled past 90% of the hero, switch the theme
    // We use 90% so the color change starts just before the white page hits the top
    if (latest > heroHeight * 0.98 && window.location.pathname === "/") {
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
        borderBottomRightRadius: "10px",
      }}
      transition={{ duration: 0.5 }}
      className={`sticky z-50  inset-x-0 top-0`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between lg:px-8"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img
              alt=""
              src="Water Quality Index.png"
              className="h-20 mt-1 w-auto"
            />
          </NavLink>
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
            <NavLink
              key={item.name}
              to={item.href}
              className={`text-sm/6 font-semibold text-${isWhiteTheme ? "black" : "white"}`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink to="/login" className="cursor-pointer">
            <button
              className={`text-sm/6 font-semibold cursor-pointer text-${isWhiteTheme ? "black" : "white"}`}
            >
              Log in &rarr;
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
            <NavLink href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </NavLink>
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
                  <NavLink
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink
                  to="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Sign up
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
//         <NavLink href="#about" className="hover:opacity-50 transition-opacity">About</NavLink>
//         <NavLink href="#services" className="hover:opacity-50 transition-opacity">Services</NavLink>
//         <NavLink href="#contact" className="hover:opacity-50 transition-opacity">Contact</NavLink>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
