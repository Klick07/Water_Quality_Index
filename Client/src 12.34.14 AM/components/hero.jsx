import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
import CalculateWQI from "./calculatewqi";
import Graph from "./graph";
import { useState } from "react";
import img from "../assets/images/glass.png";
import ModelViewer from "./3d";
import { useEffect } from "react";
import GraphContext from "../Context/GraphContext";


const Hero = (props) => {
  const sentences = [
  "An indispensable element",
  "The Biological Anchor",
  "A Finite Treasure"
];
const speed = 70;
const delay = 1500;
const [text, setText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);
const [loopNum, setLoopNum] = useState(0);
const [typingSpeed, setTypingSpeed] = useState(speed);

useEffect(() => {
  // Current index of the sentences array
  const i = loopNum % sentences.length;
  const fullText = sentences[i];

  const handleTyping = () => {
    if (!isDeleting) {
      // Typing: Add one character
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(speed);
    } else {
      // Deleting: Remove one character
      setText(fullText.substring(0, text.length - 1));
      setTypingSpeed(speed / 2); // Deleting is usually faster
    }

    // If word is complete, pause before deleting
    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), delay);
    } 
    // If word is deleted, move to the next sentence
    else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const timer = setTimeout(handleTyping, typingSpeed);
  return () => clearTimeout(timer);
}, [text, isDeleting, loopNum, sentences, speed, delay]);

  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState({ ts: [], details: {} });

  const containerRef = useRef(null);

  // This tracks the scroll of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero animations: Shrink and Fade as we scroll down
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (

    <GraphContext.Provider value={{ showGraph, setShowGraph }}>
      <div ref={containerRef} className="relative">
        {/* SECTION 1: THE PINNED HERO (Black Theme) */}
        <ModelViewer scrollYProgress={scrollYProgress} />
        <motion.div
          style={{ scale, opacity }}
          className=" absolute w-5xl pointer-events-none left-40 top-0  z-10  isolate px-6 pt-14 lg:px-8"
        >
          <div className="mx-auto min-w-5xl max-w-7xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
                Announcing for Gov official have to login with correct
                credentials.{" "}
                <a href="#" className="font-semibold text-gray-200">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 underline-offset-1"
                  />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Water {text}
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                We monitor the hidden truths of water that no one focus on.
                Water Quality Index(WQI) is our Project which aims to provide
                accurate and real-time assessment of water quality using
                advanced algorithms and data analytics.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button className="rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
                  Get started
                </button>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: THE OVERLAY PAGE (White Theme) */}
        {/* The 'relative z-10' is what makes it slide OVER the sticky hero */}
        <section className="relative z-10 bg-white rounded-t-[48px] shadow-[0_-40px_100px_rgba(0,0,0,0.4)]">
          <div className="max-w-7xl mx-auto px-6">

              <div className="flex mx-auto py-16 max-w-7xl px-6 lg:px-8">
                <div className="mr-20">
                  <h2 className="text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
                    Clean water is not a luxury — it is a basic human right.
                  </h2>
                  <p className="mt-2 text-lg/8 text-black">
                    By monitoring and improving water quality today, we ensure a
                    healthier tomorrow for future generations.
                  </p>
                </div>
              </div>

            <div className={`relative w-full ${showGraph ? "h-screen" : ""} overflow-scroll`}>
              {/* 2. The Animation Logic */}
              <AnimatePresence mode="popLayout">
                {!showGraph ? (
                  <motion.div
                    key="hero-page" // Unique key for Hero
                    initial={{ x: 0 }}
                    animate={{ x: 0, scale: 1, opacity: 1 }}
                    exit={{
                      scale: 0.8,
                      opacity: 0,
                      transition: { duration: 0.5 },
                    }} // Zooms out
                  >
                    <CalculateWQI setGraphData={setGraphData} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="graph-page" // Unique key for Graph
                    initial={{ x: "-100%" }} // Starts off-screen left
                    animate={{ x: 0 }} // Slides in
                    exit={{ x: "-100%" }} // Slides back out
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full h-full absolute top-0 left-0 z-10"
                  >
                    <Graph
                      graphData={graphData}
                      setGraphData={setGraphData}
                      setShowGraph={setShowGraph}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </GraphContext.Provider>
  );
};

export default Hero;
