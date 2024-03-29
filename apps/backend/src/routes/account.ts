import express from 'express';
import User from '../models/user';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return res.status(400).json({ 'error': 'Invalid username or password'});
    }

    const userExists = await User.findOne({username});
    if (userExists) {
        return res.status(400).json({'error': 'Username exists'});
    }

    const newUser = new User({
        username: username,
        password: password,
    });

    await newUser.save();
    if (req.session) {
        req.session.user = { userId: newUser._id };
    }
    res.status(200).json({ message: 'User created successfully' });
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

    if (password !== user.password) {
        return res.status(404).json({ message: "Invalid password." });
    }

    try {
        req.session.userId = user._id;
        res.status(200).json({ message: "Login successful" });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Logout
router.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).json({ message: "Logout successful" });
});
  
export default router;