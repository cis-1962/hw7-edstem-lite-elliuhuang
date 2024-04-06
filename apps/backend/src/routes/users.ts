import express from 'express';
import User from '../models/user';

const router = express.Router();

// Get username by id
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error getting user" });
    }
  });
  
export default router;