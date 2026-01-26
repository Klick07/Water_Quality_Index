import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const features = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];


export default function Graph() {
  const Data = [
    { time: 0, wqi: 0 },
    { time: 2, wqi: 10 },
    { time: 4, wqi: 25 },
    { time: 6, wqi: 45 },
    { time: 8, wqi: 50 },
    { time: 10, wqi: 80 },
  ];


  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-black">
                Deploy faster
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
                A better workflow
              </p>
              <p className="mt-6 text-lg/8 text-black">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-black lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-black">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-black"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div style={{ width: "100%", height: 400, marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                {/* X-Axis represents Time */}
                <XAxis dataKey="time">
                  <Label
                    value="Time (s)"
                    offset={-10}
                    position="insideBottom"
                  />
                </XAxis>

                {/* Y-Axis represents Distance */}
                <YAxis>
                  <Label value="(WQI)" offset={-20} position="insideLeft" />
                </YAxis>

                <Tooltip
                  cursor={false} // Removes the vertical line
                  content={() => null} // Makes the popup box invisible
                />

                {/* The actual line connecting distance points */}
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
          {/* <img
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
          /> */}
        </div>
      </div>
    </div>
  );
}
