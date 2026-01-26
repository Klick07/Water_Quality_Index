const pool = require("../config/db");

/**
 * Check if a state exists (exact match)
 */
exports.stateExists = async (state) => {
  const { rowCount } = await pool.query(
    `
    SELECT 1
    FROM water_quality_data
    WHERE LOWER(state) = $1
    LIMIT 1
    `,
    [state]
  );

  return rowCount > 0;
};

/**
 * Get latest records for all stations in a state
 */
exports.getLatestByState = async (state) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM water_quality_data
    WHERE LOWER(state) = $1
    `,
    [state]
  );

  return rows;
};

/**
 * Search stations by location (partial match, case-insensitive)
 */
exports.getByLocation = async (query) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM water_quality_data
    WHERE LOWER(location) LIKE '%' || $1 || '%'
    `,
    [query]
  );

  return rows;
};
