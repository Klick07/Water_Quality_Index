const AppError = require("../error/AppError");
const { getByLocation } = require("../repositories/search.repo");
const { computeWqiResult } = require("../utils/wqi.util");

exports.searchByLocationService = async (location) => {
  const rows = await getByLocation(location);

  if (rows.length === 0) {
    throw new AppError("No station found for this location", 404);
  }

  return rows.map(r => ({
    station_code: r.station_code,
    location: r.location,
    state: r.state,
    ...computeWqiResult(r)
  }));
};
