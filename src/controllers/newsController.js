const httpStatus = require("http-status");
const constants = require("../config/constants");
const { redisClient } = require("../helpers/redisHelper");
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
 * @param country - client can query countries defaults to india refer countries to https://gnews.io/docs/v4#countries
 *
 */
module.exports = {
  fetchNews: async (req, res) => {
    const {
      q: question = "All",
      limit = 5,
      category = "general",
      type = "",
      lang = "en",
      country = "in",
    } = req?.query ?? {};

    /**
     * max limit is 100
     */
    if (limit > 100) {
      req.query["limit"] = 100;
    }

    // redis cache key
    const cacheKey = `${question}_${limit}_${category}_${lang}_${country}`;
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult) {
      res.status(httpStatus.OK).json({
        fromCache: true,
        success: true,
        data: JSON.parse(cachedResult),
      });
    } else {
      const searchOptions = `/search?q=${question}`;
      const topNewsOptions = `/top-headlines?category=${category}`;
      const otherParams = `&apikey=${process.env.G_NEWS_API_KEY}&lang=${lang}&country=${country}&max=${limit}`;
      const urlOption = type === "" ? searchOptions : topNewsOptions;

      const url = `${baseUrl}${urlOption}${otherParams}`;
      const resp = await fetch(url, { method: "GET" });
      const jsonData = await resp?.json();

      await redisClient.set(cacheKey, JSON.stringify(jsonData));
      res.status(httpStatus.OK).json({ success: true, data: jsonData });
    }
  },
};
