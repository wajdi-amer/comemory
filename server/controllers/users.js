import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

import User from '../models/users.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Password.'});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(existingUser) return res.status(400).json({ message: "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchKey = async (req,res) => {
    try {
        const data = process.env.GOOGLE_ID;

        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
}