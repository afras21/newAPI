const { newsController } = require("../controllers");

module.exports = (app) => {
  app.get("/news/fetch", newsController.fetchNews);
};
