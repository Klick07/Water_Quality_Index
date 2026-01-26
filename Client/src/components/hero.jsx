
const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "Sales", href: "#" },
    author: {
      name: "Lindsay Walton",
      role: "Front-end Developer",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Improve your customer experience",
    href: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    category: { title: "Business", href: "#" },
    author: {
      name: "Tom Cook",
      role: "Director of Product",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

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
import { Link } from "react-router-dom";
import img from "../assets/images/glass.png";
import ModelViewer from "./3d";

const API = "/api/wqi";

async function search() {
  
  console.log("inside");
  // const q = document.getElementById("query").value.trim();
  // console.log("Searching for:", q);
  // if (!q) return alert("Enter a state or location");

  const res = await fetch(`http://localhost:3000${API}/search?q=uttarakhand`);
  const json = await res.json();

  // const container = document.getElementById("results");
  // container.innerHTML = "";

  // if (!json.success || json.data.length === 0) {
  //   container.innerHTML = "<p>No stations found</p>";
  //   return;
  // }

  // json.data.forEach(st => {
  //   const div = document.createElement("div");
  //   div.className = "card";

  //   div.innerHTML = `
  //     <h3>${st.location}</h3>
  //     <p><b>State:</b> ${st.state}</p>
  //     <p><b>WQI:</b> ${st.wqi} (${st.category})</p>

  //     <button onclick="loadDetails('${st.station_code}', this)">
  //       View Details
  //     </button>

  //     <div class="details"></div>
  //   `;

  //   container.appendChild(div);
  // });
  // console.log("Search results:", json.data);
}

async function loadDetails(stationCode) {
  // const box = btn.parentElement.querySelector(".details");
  // box.innerHTML = "Loading details...";

  const detailRes = await fetch(`http://localhost:3000${API}/details/${stationCode}`);
  const detailJson = await detailRes.json();
  if (!detailJson.success) {
    // box.innerHTML = "<p>Failed to load details</p>";
    throw new Error("Failed to load details");
  }

  const tsRes = await fetch(`http://localhost:3000${API}/timeseries/${stationCode}`);
  const tsJson = await tsRes.json();
  console.log("Time-series data:", tsJson);
  // if (!tsJson.success) {
  //   box.innerHTML = "<p>No time-series data</p>";
  //   return;
  // }

  const d = detailJson.data;
  const ts = tsJson.data;
  const chartId = `chart-${stationCode}`;

  // box.innerHTML = `
  //   <hr/>

  //   <p><b>Alarming Parameters:</b>
  //     ${renderList(d.alarming_parameters, "bad")}
  //   </p>

  //   <p><b>Warning Parameters:</b>
  //     ${renderList(d.warning_parameters, "warn")}
  //   </p>

  //   <h4>WQI & Alarming Parameters (Time Series)</h4>
  //   <canvas id="${chartId}" height="300"></canvas>

  //   <h4>Health Risks & Precautions</h4>
  //   ${renderHealth(d.health_risks)}
  // `;

  drawMultiLineChart(chartId, ts, d.alarming_parameters);
}



const Hero = (props) => {
  // search();
  const { text } = props;
  const [showGraph, setShowGraph] = useState(false);

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
    <div ref={containerRef} className="relative">
      {/* SECTION 1: THE PINNED HERO (Black Theme) */}
      <div className="absolute sticky top-0 z-0">

      <ModelViewer/>
      </div>
      <motion.div
        style={{ scale, opacity }}
        className="absolute sticky z-10 top-0 isolate px-6 pt-14 lg:px-8"
      >
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Announcing for Gov official have to login with correct
              credentials.{" "}
              <a href="#" className="font-semibold text-gray-400">
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
              Hello {text}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
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
        <div className="max-w-7xl mx-auto px-6 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            viewport={{ once: true, margin: "-100px" }}
          >
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
              <div className="relative h-1/2 w-1/2 lg:mx-0">
                <img src={img} className="absolute inset-0 fill object-cover" />
              </div>
            </div>
          </motion.div>

          <div className="relative w-full h-screen overflow-hidden">
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
                  className="w-full h-full"
                >
                  <CalculateWQI />
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
                  <Graph  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setShowGraph(!showGraph)}
            className=" z-50 bg-white text-black px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105"
          >
            {showGraph ? "Back to Home" : "View Analytics"}
          </button>
          {/* Add enough content here to ensure you can actually scroll! */}
          {/* <div className="h-[100vh]" /> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
