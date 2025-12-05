const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Токен отсутствует' });  
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ message: 'Токен отсутствует' });  
    }

    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    res.locals.user = user;
    next();
  } catch (err) {
    console.error('Ошибка проверки токена:', err.message);
    return res.status(403).json({ message: 'Неверный токен' });  
  }
}

module.exports = verifyAccessToken;
