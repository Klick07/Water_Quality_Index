const pool = require("../config/db");

exports.getStationTimeSeries = async (station_code) => {
  const { rows } = await pool.query(
    `
    SELECT
      recorded_at,
      ph,
      dissolved_oxygen,
      bod,
      nitrate,
      fecal_coliform,
      total_coliform,
      wqi
    FROM water_quality_timeseries
    WHERE station_code = $1
    ORDER BY recorded_at ASC
    `,
    [station_code]
  );

  return rows;
};
