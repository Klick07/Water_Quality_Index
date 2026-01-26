const pool = require("../config/db");

exports.saveRefreshToken = async (userId, tokenHash, expiresAt) => {
  await pool.query(
    `
    INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt]
  );
};

exports.findValidToken = async (tokenHash) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM refresh_tokens
    WHERE token_hash = $1
      AND revoked = FALSE
      AND expires_at > NOW()
    `,
    [tokenHash]
  );
  return rows[0] || null;
};

exports.revokeToken = async (tokenHash) => {
  await pool.query(
    `UPDATE refresh_tokens SET revoked = TRUE WHERE token_hash = $1`,
    [tokenHash]
  );
};
