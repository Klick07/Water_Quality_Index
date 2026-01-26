require("dotenv").config();
const AppError = require("../error/AppError");
const pool = require("../config/db");
const { computeWqiResult } = require("../utils/wqi.util");

exports.stationDetailsService = async (station_code) => {
  const stationResult = await pool.query(
    `
    SELECT *
    FROM water_quality_data
    WHERE station_code = $1
    ORDER BY id DESC
    LIMIT 1
    `,
    [station_code]
  );

  if (stationResult.rowCount === 0) {
    throw new AppError("Station not found", 404);
  }

  const row = stationResult.rows[0];

  const wqiResult = computeWqiResult(row);

  let healthRisks = [];

  if (wqiResult.alarming_parameters.length > 0) {
    const diseaseResult = await pool.query(
      `
      SELECT parameter, disease, precaution
      FROM disease_mapping
      WHERE parameter = ANY($1::text[])
      `,
      [wqiResult.alarming_parameters]
    );

    healthRisks = diseaseResult.rows;
  }

  return {
    station_code: row.station_code,
    location: row.location,
    state: row.state,

    wqi: wqiResult.wqi,
    category: wqiResult.category,
    alarming_parameters: wqiResult.alarming_parameters,
    warning_parameters: wqiResult.warning_parameters,

    parameters: {
      temperature: {
        min: row.temperature_min,
        max: row.temperature_max
      },
      dissolved_oxygen: {
        min: row.dissolved_oxygen_min,
        max: row.dissolved_oxygen_max
      },
      ph: {
        min: row.ph_min,
        max: row.ph_max
      },
      bod: {
        min: row.bod_min,
        max: row.bod_max
      },
      nitrate: {
        min: row.nitrate_min,
        max: row.nitrate_max
      }
    },

    health_risks: healthRisks
  };
};
