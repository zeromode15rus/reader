const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');

const authRouter = require('express').Router();


const authService = new AuthService();
const authController = new AuthController(authService)

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/refresh', authController.refresh);
authRouter.delete('/logout', authController.logout)


module.exports = authRouter;