import express, { Request, Response } from 'express';
import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add a question
router.post('/add', requireAuth, async (req: Request, res: Response) => {
    const { questionText } = req.body;
    const author = req.session?.user;
    if (!questionText) {
      return res.status(400).json({ message: "Question text is required" });
    }
  
    try {
      const newQuestion = new Question({ questionText, author });
      await newQuestion.save();
      res.status(200).json(newQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

// Answer a question
router.post('/answer', requireAuth, async (req, res) => {
    const { _id, answer } = req.body;
    if (!_id || !answer) {
      return res.status(400).json({ message: "No question ID or answer" });
    }
  
    try {
      const question = await Question.findById(_id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      question.answer = answer;
      await question.save();
      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

export default router;