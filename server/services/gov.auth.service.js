const bcrypt = require("bcrypt");
const AppError = require("../error/AppError");

const { findByUsername, createGovUser } =
  require("../repositories/govUser.repo");

const {
  saveRefreshToken,
  findValidToken,
  revokeToken
} = require("../repositories/refreshToken.repo");

const {
  generateRefreshToken,
  hashToken
} = require("../utils/token.util");

const { signAccessToken } = require("../utils/jwt.util");

exports.register = async (username, password) => {
  if (!username || !password)
    throw new AppError("Username & password required", 400);

  const existing = await findByUsername(username);
  if (existing)
    throw new AppError("Username already exists", 409);

  const passwordHash = await bcrypt.hash(password, 12);
  return createGovUser(username, passwordHash);
};

exports.login = async (username, password) => {
  const user = await findByUsername(username);
  if (!user) throw new AppError("Invalid credentials", 401);

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new AppError("Invalid credentials", 401);

  const accessToken = signAccessToken({
    sub: user.id,
    username: user.username
  });

  const refreshToken = generateRefreshToken();
  const refreshHash = hashToken(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await saveRefreshToken(user.id, refreshHash, expiresAt);

  return { accessToken, refreshToken, username: user.username };
};

exports.refresh = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);
  const stored = await findValidToken(tokenHash);

  if (!stored)
    throw new AppError("Invalid refresh token", 401);

  await revokeToken(tokenHash);

  const accessToken = signAccessToken({ sub: stored.user_id });

  const newRefresh = generateRefreshToken();
  const newHash = hashToken(newRefresh);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await saveRefreshToken(stored.user_id, newHash, expiresAt);

  return { accessToken, refreshToken: newRefresh };
};

exports.logout = async (refreshToken) => {
  await revokeToken(hashToken(refreshToken));
};
