import express from 'express';
import { connectDb } from './config/db.js';
import signupRoutes from './routes/signup.js';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import jwt from 'jsonwebtoken';

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

const jwtSecretKey = 'miow';

app.use('/login', loginRoutes);
app.use((req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        const tokenString = token.slice(7);
        jwt.verify(tokenString, jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'Token not provided or invalid format' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Clear the user cookie if using cookies
    res.status(200).json({ message: 'Logout successful' });
});

app.use('/secure', (req, res, next) => {
    res.set('Cache-Control', 'no-store'); // Prevent caching for secure routes
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    } else {
        next();
    }
});

app.use('/secure', (req, res) => {
    res.status(200).json({ message: 'Authenticated route' });
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
