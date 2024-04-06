import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';
import userRouter from './routes/users';

dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['k1', 'k2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://elliuh:cis1962@edstemlite.3ia3g0c.mongodb.net/?retryWrites=true&w=majority&appName=edstemlite'
mongoose.connect(MONGO_URI)
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
  });

// define root route
app.get('/api/hello', (_, res) => {
  return res.json({ message: 'Hello, frontend!' });
});

// account routes
app.use('/api/account', accountRouter);

// question routes
app.use('/api/questions', questionsRouter);

// user routes
app.use('/api/user', userRouter);

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
