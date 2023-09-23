const httpStatus = require("http-status");
const constants = require("../config/constants");
const baseUrl = constants.GNEWS_BASE_URL;

/**
 * @sample_search - http://localhost:3000/news/fetch?q=all&limit=1
 * @sample_top_news -http://localhost:3000/news/fetch?q=all&limit=5&type=top&category=india
 */

/**
 *
 * @name fetchNews fetches top news and normal news
 * @param q - question or title on which the news is related to
 * @param limit - max of no news to be fetched
 * @param category - category of news ->{only for top news}
 * @param type - type of news top or other
 * @param language - language of new, defaults to en
 */
module.exports = {
  fetchNews: async (req, res) => {
    const {
      q: question = "All",
      limit = 5,
      category = "general",
      type = "",
      lang = "en",
    } = req?.query ?? {};

    const searchOptions = `/search?q=${question}&max=${limit}`;
    const topNewsOptions = `/top-headlines?category=${category}`;

    const urlOption = type === "" ? searchOptions : topNewsOptions;

    const url = `${baseUrl}${urlOption}&apikey=${process.env.G_NEWS_API_KEY}&lang=${lang}`;
    const resp = await fetch(url, { method: "GET" });
    const jsonData = await resp?.json();

    res.status(httpStatus.OK).json({ success: true, data: jsonData });
  },
};
