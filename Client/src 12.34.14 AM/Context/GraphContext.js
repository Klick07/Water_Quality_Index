import { createContext } from "react";

const GraphContext = createContext({
  showGraph: false,
  setShowGraph: () => {},
});

export default GraphContext;
