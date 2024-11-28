const createRateLimiter = (requestLimit, windowSize) => {
  // Initialize bucket with tokens and timestamp for this instance
  let bucket = {
    tokens: requestLimit,
    lastRefill: Date.now(),
  };

  return (req, res, next) => {
    const currentTime = Date.now();

    // Calculate the number of tokens to add since the last refill
    const timeElapsed = currentTime - bucket.lastRefill;
    console.log("current time = ", currentTime, "timeElapsed = ", timeElapsed);
    const tokensToAdd = Math.floor((timeElapsed / windowSize) * requestLimit);
    console.log("token to be added", tokensToAdd);

    // Refill tokens, but do not exceed the maximum limit
    bucket.tokens = Math.min(requestLimit, bucket.tokens + tokensToAdd);
    console.log("bucket token", bucket.tokens);
    bucket.lastRefill = currentTime;

    if (bucket.tokens > 0) {
      // Consume a token and allow the request
      bucket.tokens--;
      console.log("Left token", bucket.tokens);
      return next();
    } else {
      // Deny the request
      return res.status(429).json({
        message: `Rate limit exceeded. Try again later.`,
        status: 429,
      });
    }
  };
};

export default createRateLimiter;
