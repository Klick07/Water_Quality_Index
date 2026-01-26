const pool = require("../config/db");

exports.findByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT * FROM gov_users WHERE username = $1`,
    [username]
  );
  return rows[0] || null;
};

exports.createGovUser = async (username, passwordHash) => {
  const { rows } = await pool.query(
    `
    INSERT INTO gov_users (username, password_hash)
    VALUES ($1, $2)
    RETURNING id, username
    `,
    [username, passwordHash]
  );
  return rows[0];
};
