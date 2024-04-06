import '../app.css';
import { ChangeEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewQuestionsComponent = () => {
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  const postAttempt = async () => {
    if (questionText && questionText.trim() !== '') {
      try {
        const res = await fetch('/api/questions/add', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questionText : questionText}),
        });
        if (!res.ok) {
          throw new Error('post failed'); 
        }
        toast.success('Question posted!');
        navigate('/')
      } catch (error) {
        toast.error('Post failed');
      }
    } else {
      toast.error('Please enter valid question.');
    }
    setQuestionText('');
  }

  return (
    <>
      <div className="new-question">
        <input
          className="Input"
          type="text"
          value={questionText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)}
          placeholder='Question'
        />
        <Button variant="contained" onClick={postAttempt}>Post</Button>
      </div>
    </>
  );
}

export default NewQuestionsComponent;