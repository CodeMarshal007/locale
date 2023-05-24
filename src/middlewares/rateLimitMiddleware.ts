import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache();

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ipAddress: string = req.ip;
  const windowMs: number = 60 * 1000; // 1 minute
  const maxRequests: number = 100; // Maximum number of requests allowed within the window

  let requestsCount: number = cache.get(ipAddress) as number || 0;

  if (requestsCount >= maxRequests) {
    // If the maximum number of requests is exceeded, return an error response
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  requestsCount++;

  // Store the updated request count in the cache
  cache.set(ipAddress, requestsCount, windowMs / 1000);

  next();
};

export default rateLimitMiddleware;
