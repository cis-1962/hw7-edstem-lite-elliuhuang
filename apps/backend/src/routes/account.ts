import express from 'express';
import User from '../models/user';

const router = express.Router();

// Get current user
router.get('/current-user', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ username: req.session.user.username });
  }
  res.status(404).json({ error: "No user logged in" });
});

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password || username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ 'error': 'Invalid username or password'});
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "Username exists." });
  }

  const newUser = new User({
    username: username,
    password: password,
});
  await newUser.save();

  if (req.session) {
    req.session.user = { username: newUser.username };
  }

  res.status(200).json({ message: "User created successfully!" });

});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
      return res.status(400).json({ error: 'Username and password required'});
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    if (password !== user.password) {
        return res.status(404).json({ error: "Invalid password." });
    }
    if (req.session) {
      req.session.user = {username: user.username};
    }

    res.status(200).json({ message: "Login Successful" });

});

// Logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ error: "Logout successful." });
});

export default router;
