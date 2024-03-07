import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// add some validator using express-validator
router.post('/register', [
  check('firstName', 'First Name is required').isString(),
  check('lastName', 'Last Name is required').isString(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    // if user already exists
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // if user does not exist
    user = new User(req.body);
    await user.save();

    // now we need to encrypt the password before saving it in the database
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1d', // you can change this based on your preference
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      // if we are in production, secure will be true; if not, secure is false, which we want
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    });

    // Use either res.sendStatus(200) or res.json({ message: 'User Registered OK' })
  
    // or
    res.json({ message: 'User Registered OK' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
