const cookieConfig = require('../config/cookie.config');
const generateTokens = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const user = await this.authService.register(req.body);
      const { accessToken, refreshToken } = generateTokens(user);  

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  refresh = async (req, res) => {
    try {
      const { refreshToken: oldRefreshToken } = req.cookies;

      if (!oldRefreshToken) {
        return res.status(401).json({ message: 'Refresh token отсутствует' });
      }

      const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

      // ✅ Убираем exp, iat
      const user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      };

      const { accessToken, refreshToken } = generateTokens(user);  // ✅

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (err) {
      console.error('Ошибка refresh:', err.message);
      res.status(401).json({ message: 'Неверный refresh token' });
    }
  };

  logout = (req, res) => {
    res.clearCookie('refreshToken').sendStatus(204);
  };

  login = async (req, res) => {
    try {
      const user = await this.authService.login(req.body);
      const { accessToken, refreshToken } = generateTokens(user);

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = AuthController;

