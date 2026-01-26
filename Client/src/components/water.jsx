import { motion } from "framer-motion";

export default function RealisticWater() {
  return (
    
    <div className="flex h-screen w-full items-center justify-center bg-neutral-950">
      
      {/* 1. THE GLASS CONTAINER */}
      <div className="relative h-[400px] w-[600px] border-2 border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center rounded-lg shadow-2xl">
        
        {/* THE TEXT (Behind the water but visible) */}
        <h1 className="relative z-10 text-7xl font-bold text-white/30 tracking-widest uppercase">
          SHIVAM
        </h1>

        {/* 2. THE RISING WATER */}
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: "60%" }} // Spills up to 60%
          transition={{ duration: 4, ease: "circOut" }}
          style={{ 
            filter: "url(#liquid-filter)", // Applying the realistic ripple
            background: "linear-gradient(180deg, rgba(0,183,255,0.6) 0%, rgba(0,81,255,0.8) 100%)"
          }}
          className="absolute bottom-0 left-0 w-full z-20"
        >
          {/* Surface Highlight (That "shimmer" on top) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
          
          {/* Submerged Text (The text looks different under water) */}
          <div className="flex h-full w-full items-center justify-center">
             <h1 className="text-7xl font-bold text-white tracking-widest uppercase select-none opacity-80">
                SHIVAM
             </h1>
          </div>
        </motion.div>

        {/* 3. REFLECTIONS ON THE GLASS */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
      </div>

      {/* Repeating the SVG Filter here so it works */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter">
          <feTurbulence baseFrequency="0.015" numOctaves="3" seed="2">
            <animate attributeName="baseFrequency" dur="5s" values="0.015;0.02;0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      
    </div>
    
  );
}