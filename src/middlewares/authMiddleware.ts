import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


const jwtSecret = process.env.JWT_SECRET;
const myKey = process.env.MY_API_KEY;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const apiKey = req.headers.authorization;

  if (apiKey && apiKey === myKey) {
    // For API owner, allow all requests
    next();
  } else if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      (req as any).user = decoded;

      if (req.method === 'GET') {
        next();
      } else {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization token or API key is missing' });
  }
};

export default authMiddleware;
