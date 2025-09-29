import express, { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import mongoose, { Document } from 'mongoose';


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const router = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no .env");
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};

// -------------------- REGISTER --------------------
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'EMAIL_PASSWORD_REQUIRED' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'EMAIL_ALREADY_EXISTS' });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id.toString());

    return res.json({
      success: true,
      message: 'REGISTER_SUCCESS',
      data: { token, user: { id: user._id, email: user.email } }
    });
  } catch (err: any) {
    console.error(err);

    if (err.name === 'ValidationError') {
      const firstError = Object.values(err.errors)[0] as any;
      return res.status(400).json({ success: false, message: firstError.message });
    }

    return res.status(500).json({ success: false, message: 'REGISTER_ERROR' });
  }
});

// -------------------- LOGIN --------------------
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'EMAIL_PASSWORD_REQUIRED' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'USER_NOT_FOUND' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'INVALID_PASSWORD' });
    }

    const token = generateToken(user._id.toString());

    return res.json({
      success: true,
      message: 'LOGIN_SUCCESS',
      data: { token: token, user: { id: user._id, email: user.email } }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'LOGIN_ERROR' });
  }
});

export default router;

