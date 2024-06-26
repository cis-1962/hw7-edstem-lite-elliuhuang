import mongoose, { Document, Schema } from 'mongoose';

type QuestionType = {
  questionText: string;
  answer?: string;
  author: string;
};

type QuestionModel = QuestionType & Document;

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: false },
  author: { type: String, required: true },
});

const Question = mongoose.model<QuestionModel>('Question', QuestionSchema);
export default Question;
