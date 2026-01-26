const repo = require("../repositories/gov.data.repo");
const AppError = require("../error/AppError");

exports.uploadLatest = async (payload) => {
  if (!payload.station_code || !payload.state) {
    throw new AppError("station_code and state are required", 400);
  }
  await repo.insertLatestWaterQuality(payload);
};

exports.uploadTimeseries = async (payload) => {
  if (!payload.station_code || payload.wqi == null) {
    throw new AppError("station_code and wqi are required", 400);
  }
  await repo.insertTimeseries(payload);
};
