import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import GraphContext from "../Context/GraphContext";


const API = "/api/wqi";


async function search(location) {


  const res = await fetch(`http://localhost:3000${API}/search?q=${location}`);
  const json = await res.json();

  return json.data; 
}

async function loadDetails(stationCode) {


  const detailRes = await fetch(
    `http://localhost:3000${API}/details/${stationCode}`,
  );
  const detailJson = await detailRes.json();
  if (!detailJson.success) {

    throw new Error("Failed to load details");
  }

  const tsRes = await fetch(
    `http://localhost:3000${API}/timeseries/${stationCode}`,
  );
  const tsJson = await tsRes.json();


  const d = detailJson.data;
  const ts = tsJson.data;
  const chartId = `chart-${stationCode}`;

  return [tsJson.data, detailJson.data];


}

export default function CalculateWQI({ setGraphData }) {
  const [location, setlocation] = useState("");
  const { showGraph, setShowGraph } = useContext(GraphContext);
  const [searchDetails, setsearchDetails] = useState([]); // initialize as array

  const [stateunderline, setstateunderline] = useState(true);
  return (
    <div className=" max-w-6xl mx-auto mt-24 sm:mt-32 sm:mb-40 lg:mb-16 bg-white">
      <h2 className="text-4xl font-semibold m-16 tracking-tight text-center text-pretty text-black sm:text-5xl">
        Calculating WQI
      </h2>
      <p className="text-2xl text-center">
        <Link
          className={` ${stateunderline ? "underline text-3xl" : ""}`}
          onClick={() => {
            setstateunderline(true);
          }}
        >
          State
        </Link>
        /
        <Link
          className={`bold ${!stateunderline ? "underline text-3xl" : ""}`}
          onClick={() => {
            setstateunderline(false);
          }}
        >
          Location
        </Link>
      </p>
      <div className=" mt-8 mb-30 flex gap-4 ">
        <input
          id="state-location"
          type="text"
          value={location}
          onChange={(e) => {
            setlocation(e.target.value);

          }}
          autoComplete="given-name"
          placeholder={`Enter ${stateunderline ? "State" : "Location"}`}
          className=" block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1  outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-balck/5"
        />
        <button
          onClick={async () => {
            const result = await search(location);
            setsearchDetails(result || []);
          }}
          className="rounded-md mx-auto bg-gray-200 px-3.5 py-2 text-sm font-semibold text-black "
        >
          Search
        </button>
      </div>

        <div className="mx-auto  mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {Object.values(searchDetails).map((post, idx) => (
            <article
              key={post.stationCode || idx}
              className="flex   max-w-xl flex-col items-start justify-between"
            >
              <div className="group  relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-black group-hover:text-black">
                  <span className="absolute inset-0" />
                  {post.location}
                  <p className="text-black">{post.state}</p>
                </h3>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <div className="text-sm/6">
                  <p className="font-semibold text-black">
                    <span className="absolute inset-0" />
                    {post.wqi}
                  </p>
                  <p className="text-black">{post.category}</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  const [tsData, detailsData] = await loadDetails(post.station_code);
                  setGraphData({ ts: tsData, details: detailsData });
                  setShowGraph(true);
                }}
                className="graphwala z-50 bg-white text-black px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105"
              >
                {"View Analytics"}
              </button>
            </article>
          ))}
        </div>
      </div>
  );
}

