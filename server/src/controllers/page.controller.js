class PageController {
  constructor(pageService, aiService) {
    this.pageService = pageService;
    this.aiService = aiService;
  }
  getPage = async (req, res) => {
    try {
      const page = await this.pageService.getPage();
      res.json(page);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении книжки' });
    }
  };
  getRareWords = async (req, res) => {
    try {
      const arr = await this.aiService.getRareWords();
      const half = arr.length / 2;
      const words = arr.slice(0, half);
      const defs = arr.slice(half);

      const items = words.map((word, index) => ({
        word,
        definition: defs[index],
      }));

      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении слов' });
    }
  };
}

module.exports = PageController;
