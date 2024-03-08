import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }
       const hashpassword = await bcrypt.hash(password,10)

        // Create new user instance
        const newUser = new User({ firstName, lastName, email, password:hashpassword, username });
        
        // Log the data being saved
        console.log('Data to be saved:', req.body);

        // Save new user to the database
        await newUser.save();
        
        // Log successful user save
        console.log('User saved successfully');
        
        // Return success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Log any errors during saving
        console.error('Error saving user:', error);
        
        // Handle specific errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        
        // Handle unexpected errors
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

;

export default router;
