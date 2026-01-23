// ===============================
// WQI standards & weights (CPCB / WHO inspired)
// ===============================
const WQI_PARAMS = {
  dissolved_oxygen: { ideal: 14.6, standard: 5, weight: 0.22 },
  ph: { ideal: 7.0, standard: 8.5, weight: 0.16 },
  bod: { ideal: 0, standard: 3, weight: 0.19 },
  nitrate: { ideal: 0, standard: 45, weight: 0.16 },
  fecal_coliform: { ideal: 0, standard: 100, weight: 0.27 }
};

// ===============================
// Helper: calculate average safely
// ===============================
const calculateAverage = (min, max) => {
  if (min === null || max === null || min === undefined || max === undefined) {
    return null;
  }

  const minVal = parseFloat(min);
  const maxVal = parseFloat(max);

  if (Number.isNaN(minVal) || Number.isNaN(maxVal)) {
    return null;
  }

  return (minVal + maxVal) / 2;
};

// ===============================
// Helper: calculate quality index (Qi)
// ===============================
const calculateQi = (value, ideal, standard) => {
  if (value === null || value === undefined) return null;
  if (standard === ideal) return null;

  const qi = ((value - ideal) / (standard - ideal)) * 100;

  // Clamp between 0 and 100
  return Math.max(0, Math.min(qi, 100));
};

// ===============================
// Main: Research-grade WQI calculator
// ===============================
const calculateWQI = (station) => {
  if (!station) return 0;

  const paramList = [
    {
      key: "dissolved_oxygen",
      avg: calculateAverage(
        station.dissolved_oxygen_min,
        station.dissolved_oxygen_max
      )
    },
    {
      key: "ph",
      avg: calculateAverage(
        station.ph_min,
        station.ph_max
      )
    },
    {
      key: "bod",
      avg: calculateAverage(
        station.bod_min,
        station.bod_max
      )
    },
    {
      key: "nitrate",
      avg: calculateAverage(
        station.nitrate_min,
        station.nitrate_max
      )
    },
    {
      key: "fecal_coliform",
      avg: calculateAverage(
        station.fecal_coliform_min,
        station.fecal_coliform_max
      )
    }
  ];

  let weightedSum = 0;
  let totalWeight = 0;

  for (const param of paramList) {
    const config = WQI_PARAMS[param.key];
    if (!config || param.avg === null) continue;

    const qi = calculateQi(
      param.avg,
      config.ideal,
      config.standard
    );

    if (qi === null) continue;

    weightedSum += qi * config.weight;
    totalWeight += config.weight;
  }

  if (totalWeight === 0) return 0;

  return Math.round(weightedSum / totalWeight);
};

// ===============================
// WQI category classifier
// ===============================
const getCategory = (wqi) => {
  if (wqi === null || wqi === undefined || Number.isNaN(wqi)) {
    return "Unknown";
  }

  if (wqi <= 50) return "Excellent";
  if (wqi <= 100) return "Good";
  if (wqi <= 200) return "Poor";
  return "Very Poor";
};

// ===============================
// Exports
// ===============================
module.exports = {
  calculateWQI,
  getCategory,
  calculateAverage
};
