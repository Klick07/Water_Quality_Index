
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function Graph(props) {
  const ts = props.graphData?.ts || [];
  const details = props.graphData?.details || {};

  const RawDatats = Array.isArray(ts) ? ts : [];
  const Data = RawDatats.map((entry) => ({
    time: entry.recorded_at,
    wqi: entry.wqi,
  }));

  // Use details directly
  console.log("Details in Graph:", details);

  return (
    <div className=" py-2 sm:py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-black">
                {details.location || "No Location"}
              </h2>
              <p className="mt-2 text-2xl font-semibold text-black">
                State: {details.state || "N/A"}
              </p>
              <p className="mt-2 text-xl text-black">
                WQI: {details.wqi} ({details.category})
              </p>
              <p className="mt-2 text-black">
                Alarming Parameters:{" "}
                {details.alarming_parameters?.join(", ") || "None"}
              </p>
              <p className="mt-2 text-black">
                Warning Parameters:{" "}
                {details.warning_parameters?.join(", ") || "None"}
              </p>
              <p className="mt-2 text-black">
                Precaution Parameters:{" "}
                {details.precaution_parameters?.join(", ") || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Parameter:{" "}
                {details.health_risks?.[0]?.parameter || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Disease:{" "}
                {details.health_risks?.[0]?.disease || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Precaution:{" "}
                {details.health_risks?.[0]?.precaution || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Parameter:{" "}
                {details.health_risks?.[1]?.parameter || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Disease:{" "}
                {details.health_risks?.[1]?.disease || "None"}
              </p>
              <p className="mt-2 text-black">
                Health Risk Precaution:{" "}
                {details.health_risks?.[1]?.precaution || "None"}
              </p>

            </div>
          </div>
          <div style={{ width: "100%", height: 600, marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis dataKey="time">
                  <Label
                    value="Time (s)"
                    offset={-10}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis>
                  <Label value="(WQI)" offset={-20} position="insideLeft" />
                </YAxis>
                <Tooltip
                  cursor={true}
                  content={({ payload, label, active }) =>
                    active && payload && payload.length ? (
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid #ccc",
                          padding: 8,
                          borderRadius: 4,
                        }}
                      >
                        <div>
                          <strong>Time:</strong> {label}
                        </div>
                        <div>
                          <strong>WQI:</strong> {payload[0].value}
                        </div>
                      </div>
                    ) : null
                  } // Makes the popup box invisible
                />
                <Line
                  type="monotone"
                  dataKey="wqi"
                  stroke="#000000"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button className="z-50 bg-white text-black px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105" onClick={(e) => props.setShowGraph(false)}>
            Back 
          </button>
        </div>
      </div>
    </div>
  );
}
