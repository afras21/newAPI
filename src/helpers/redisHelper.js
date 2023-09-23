const redis = require("redis");
var redisClient;
const REDIS_PORT = 6379;
redisClient = redis.createClient(REDIS_PORT);

redisClient.connect();

redisClient.on("connect", function () {
  console.log("Redis client connected..." + REDIS_PORT);
});

redisClient.on("error", function (err) {
  console.log("Redis - Something went wrong " + err);
});
module.exports = {
  redisClient,
};
