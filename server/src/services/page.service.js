const { Page } = require('../../db/models');
class PageService {
  async getPage() {
    const page = await Page.findAll();
    return page;
  }
}

module.exports = PageService;
