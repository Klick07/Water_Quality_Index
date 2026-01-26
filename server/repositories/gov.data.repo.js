const pool = require("../config/db");

/**
 * Insert / update latest snapshot
 */
exports.insertLatestWaterQuality = async (data) => {
  const query = `
    INSERT INTO water_quality_data (
      station_code,
      location,
      state,
      temperature_min, temperature_max,
      dissolved_oxygen_min, dissolved_oxygen_max,
      ph_min, ph_max,
      conductivity_min, conductivity_max,
      bod_min, bod_max,
      nitrate_min, nitrate_max,
      fecal_coliform_min, fecal_coliform_max,
      total_coliform_min, total_coliform_max,
      fecal_streptococci_min, fecal_streptococci_max
    )
    VALUES (
      $1,$2,$3,
      $4,$5,
      $6,$7,
      $8,$9,
      $10,$11,
      $12,$13,
      $14,$15,
      $16,$17,
      $18,$19,
      $20,$21
    )
  `;

  const values = [
    data.station_code,
    data.location,
    data.state,
    data.temperature_min,
    data.temperature_max,
    data.dissolved_oxygen_min,
    data.dissolved_oxygen_max,
    data.ph_min,
    data.ph_max,
    data.conductivity_min,
    data.conductivity_max,
    data.bod_min,
    data.bod_max,
    data.nitrate_min,
    data.nitrate_max,
    data.fecal_coliform_min,
    data.fecal_coliform_max,
    data.total_coliform_min,
    data.total_coliform_max,
    data.fecal_streptococci_min,
    data.fecal_streptococci_max
  ];

  await pool.query(query, values);
};

/**
 * Insert time-series reading
 */
exports.insertTimeseries = async (data) => {
  await pool.query(
    `
    INSERT INTO water_quality_timeseries (
      station_code,
      recorded_at,
      ph,
      dissolved_oxygen,
      bod,
      nitrate,
      fecal_coliform,
      total_coliform,
      wqi
    )
    VALUES ($1, NOW(), $2,$3,$4,$5,$6,$7,$8)
    `,
    [
      data.station_code,
      data.ph,
      data.dissolved_oxygen,
      data.bod,
      data.nitrate,
      data.fecal_coliform,
      data.total_coliform,
      data.wqi
    ]
  );
};
