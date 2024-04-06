import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type signupProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignupPageComponent: React.FC<signupProps> = ({setSignedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const signupAttempt = async () => {
    if (username !== '' && password !== '') {
      try {
        const res = await fetch('/api/account/signup', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }), 
        });
        if (!res.ok) {
          throw new Error('Signup failed'); 
        }
        setSignedIn(true); 
        toast.success('Successfully signed up!');
        navigate("/");
        
      } catch (error) {
        toast.error('Username taken or invalid username or password.');
      }
    } else {
      toast.error('Invalid username or password.');
    }
    setUsername('');
    setPassword('');
  }
  return (
    <>
      <div className="signup">
        <div>
        <input
          className="Input"
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="username"
        />
        </div>
        <div>
        <input
          className="Input"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="password"
        />
        </div>
        <div>
        <Button variant="contained" onClick={signupAttempt}>Sign Up</Button>
        </div>
      </div>
    </>
  );
}

const SignupComponent: React.FC = () => {
  const { signedIn, setSignedIn } = useAuth();

  return (
    <>
      <ToastContainer />
      {!signedIn && (
        <Container>
          <Row className="mt-3">
            <Col>
              <h2>Create an EdStemLite Account! We promise not to sell your data.</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={6}>
              <SignupPageComponent setSignedIn={setSignedIn} />
            </Col>
            <Col sm={6}>
              <div>
                <h3>Have an account?</h3>
                <Button variant="contained">
                  <Link to={`/login`}>Log In</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default SignupComponent;
