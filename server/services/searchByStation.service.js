const AppError = require("../error/AppError");
const { getLatestByState } = require("../repositories/search.repo");
const { computeWqiResult } = require("../utils/wqi.util");

exports.searchByStateService = async (state) => {
  const rows = await getLatestByState(state);

  if (rows.length === 0) {
    throw new AppError("No stations found for this state", 404);
  }

  return rows.map(r => ({
    station_code: r.station_code,
    location: r.location,
    state: r.state,
    ...computeWqiResult(r)
  }));
};
