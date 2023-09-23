# newsAPI

## Setting it Up!
1. Signup to [G_NEWs](https://gnews.io/) and create your `api key`
2. Remember to `verify your email` before using api key
3. create `.env` file and refer env variables from `env.example`
```sh
PORT=3000
G_NEWS_API_KEY=<you_api_key_from g_news>

```

Install the dependencies and devDependencies and start the server.

```sh
cd NewsApi
npm i
npm run dev
```

## Sample URLs 
- News Search - `http://localhost:3000/news/fetch?q=all&limit=1`
- Top News - `http://localhost:3000/news/fetch?q=all&limit=5&type=top&category=india`

## Sample response
```sh
{
  "totalArticles": 54904,
  "articles": [
    {
      "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
      "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
      "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
      "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
      "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
      "publishedAt": "2022-09-28T08:14:24Z",
      "source": {
        "name": "PhoneArena",
        "url": "https://www.phonearena.com"
      }
    }
  ]
}
```
