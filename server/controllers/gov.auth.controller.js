const authService = require("../services/gov.auth.service");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await authService.register(username, password);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.json(await authService.login(username, password));
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    res.json(await authService.refresh(refreshToken));
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
