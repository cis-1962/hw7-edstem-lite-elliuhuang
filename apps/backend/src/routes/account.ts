import express from 'express';
import User from '../models/user';
import cookieSession from 'cookie-session';

const router = express.Router();

router.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'], 
    maxAge: 60 * 60 * 1000, // 1 hour session
  }));

// Signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return res.status(400).json({ 'error': 'Invalid username or password'});
    }

    try {
        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User already exists' });
    }
  });
  
  // Login
router.post('/login', async (req, res, next) => {
    if (!req.session) {
        return res.status(500).json({ message: "Session not available" });
    }

    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return res.status(400).json({ 'error': 'Username and password required'});
    }
    
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    try {
        if (!(password === user.password)) {
            return res.status(401).json({ message: "Invalid password." });
        }

        req.session.userId = user._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}, (req, res) => {
    res.status(200).json({ message: "Login successful" });
});
  
// Logout
router.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).json({ message: "Logout successful" });
});
  
export default router;