import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import accountRouter from './routes/account';
import questionsRouter from './routes/questions';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['k1', 'k2'], 
  maxAge: 60 * 60 * 1000, // 1 hour session
}));

app.use(bodyParser.json());

// connect MongoDB
const MONGO_URI = 'mongodb+srv://elliuh:cis1962@edstemlite.3ia3g0c.mongodb.net/?retryWrites=true&w=majority&appName=edstemlite';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// account routes
app.use('/api/account', accountRouter);

// question routes
app.use('/api/questions', questionsRouter);

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
