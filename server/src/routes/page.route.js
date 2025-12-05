const PageController = require('../controllers/page.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const AiService = require('../services/ai.service');
const PageService = require('../services/page.service');

const pageRouter = require('express').Router();

const pageService = new PageService();
const aiService = new AiService();

const pageController = new PageController(pageService, aiService);

pageRouter.get('/page', verifyAccessToken, pageController.getPage.bind(pageController));
pageRouter.get('/ai', pageController.getRareWords.bind(pageController));

module.exports = pageRouter;
