import client from "../config/redis.config.js";

const createRateLimiter = (requestLimit, windowSize) => {
  return async (req, res, next) => {
    const userKey = `rate_limiter${req.ip}`;
    const currentTime = Date.now();

    try {
      const data = await client.get(userKey); // Retrieve data with Promises
      console.log("data ", data);
      let bucket;

      if (data) {
        // If data exists, parse it and calculate tokens to add
        bucket = JSON.parse(data);
        const timeElapsed = currentTime - bucket.lastRefill;
        const tokensToAdd = Math.floor(
          (timeElapsed / windowSize) * requestLimit
        );
        bucket.tokens = Math.min(requestLimit, bucket.tokens + tokensToAdd);
        bucket.lastRefill = currentTime;
      } else {
        // Initialize a new bucket if data is not found
        bucket = {
          tokens: requestLimit,
          lastRefill: currentTime,
        };

        // Set new bucket in Redis with TTL (expires after windowSize)
        const setUser = await client.setex(userKey, 30, JSON.stringify(bucket));
        console.log("Set new bucket for user: ", setUser);
      }

      if (bucket.tokens > 0) {
        // If there are tokens left, consume one
        bucket.tokens--;
        console.log("Left token == ", bucket.tokens);

        // Update Redis with the new bucket state and TTL
        await client.setex(userKey, 30, JSON.stringify(bucket));
        next(); // Proceed to next middleware
      } else {
        // If rate limit exceeded, respond with 429 status
        res.status(429).json({
          message: "Rate limit exceeded. Try again later.",
          status: 429,
        });
      }
    } catch (error) {
      console.error("Redis error:", error);
      res.status(500).json({
        message: "Internal server error.",
        status: 500,
      });
    }
  };
};

export default createRateLimiter;
