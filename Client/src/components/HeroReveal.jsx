import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function RevealSection() {
  const containerRef = useRef(null);

  // 1. Track scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Link scroll progress to Zoom Out (Scale) and Fade Out (Opacity)
  // As scroll goes from 0 to 1, scale goes from 1 down to 0.7
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* PINNED HERO SECTION (Black Theme) */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0">
        <motion.div 
          style={{ scale, opacity }} 
          className="text-center px-4"
        >
          <span className="text-orange-500 uppercase tracking-widest text-sm font-semibold">
            Innovation in Motion
          </span>
          <h1 className="text-white text-6xl md:text-8xl font-bold mt-4 leading-tight">
            BLACK THEMED <br /> HERO SECTION
          </h1>
        </motion.div>
      </section>

      {/* OVERLAY CONTENT (White Themed Webpage) */}
      <section className="relative z-10 bg-white min-h-screen rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        <div className="max-w-5xl mx-auto py-32 px-10">
          
          {/* FADE IN TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              A New Perspective
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              As you scroll down, the dark hero section recedes into the background
              while this clean, white-themed layout takes over. This technique is 
              perfect for shifting the user's focus from "Vibe" to "Information."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
             {/* Example of more content reveals */}
             {[1, 2].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.2 }}
                 className="h-80 bg-gray-100 rounded-2xl"
               />
             ))}
          </div>
        </div>
      </section>

      {/* Extra space so the animation has room to finish */}
    </div>
  );
}