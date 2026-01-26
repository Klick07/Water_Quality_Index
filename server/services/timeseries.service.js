const AppError = require("../error/AppError");
const { getStationTimeSeries } = require("../repositories/timeseries.repo");

exports.getStationTimeSeriesService = async (station_code) => {
  const rows = await getStationTimeSeries(station_code);

  if (rows.length === 0) {
    throw new AppError("No time-series data found", 404);
  }

  return rows;
};
