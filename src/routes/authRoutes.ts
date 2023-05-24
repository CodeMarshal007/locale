import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

const router = Router();

const jwtSecret = process.env.JWT_SECRET;
const myKey = process.env.MY_API_KEY;

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log( req.body );

    const apiKey = Math.random().toString(36).substr(2, 12);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      apiKey,
    });
    await newUser.save();

    res.json({
      message: 'Signup successful',
      apiKey: newUser.apiKey,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, apiKey } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (apiKey && apiKey === myKey) {
      // Generate token for API owner
      const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
      return res.json({
        message: 'Login successful',
        token,
        apiKey: user.apiKey,
      });
    } else {
      // Generate token for other users
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      return res.json({
        message: 'Login successful',
        token,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
