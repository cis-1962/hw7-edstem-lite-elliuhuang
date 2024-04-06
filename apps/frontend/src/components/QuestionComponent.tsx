import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const QuestionDetailPage = () => {
  const { signedIn } = useAuth()
  const { questionId } = useParams();
  const { data: question, error, mutate } = useSWR(`/api/questions/${questionId}`, fetcher);

  if (error) {
    toast.error(error);
  };
  if (!question) return (
    <></>
  )

  const AnswerQuestionComponent : React.FC<{questionId: string}> = ({questionId}) => {
    const [answer, setAnswer] = useState<string>('')

    const answerQuestion = async () => {
      if (answer !== '' && answer.trim() !== '') {
        try {
          const res = await fetch(`/api/questions/${questionId}/answer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer }),
          });
          if (!res.ok) {
            throw new Error('Failed to post answer');
          }
          // toast.success('Answer posted!');
          mutate();
          setAnswer('');
        } catch (error) {
          toast.error('Failed to post answer.');
        }
      } else {
        toast.error('Invalid answer.');
      }
    };

    return (
      <>
        <div>
          Answer this question:
        </div>
        <div className="answer">
        <input
          className="Input"
          type="text"
          value={answer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
          placeholder="Answer"
        />
        <Button variant="contained" onClick={answerQuestion}>Post Answer</Button>
      </div>
      </>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ fontWeight: 'bold', fontSize: '35px', color: 'gray' }}>{question.questionText}</h2>
          <h3 style={{ fontWeight: 'bold' }}>Author:</h3>
          <h4 style={{ color: 'gray' }}>{question.author}</h4>
          <h3 style={{ fontWeight: 'bold' }}>Answer:</h3>
          <h4 style={{ color: 'gray' }}>{question.answer}</h4>
          {signedIn && <AnswerQuestionComponent questionId={questionId} />}
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionDetailPage;
