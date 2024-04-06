import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../AuthContext.tsx';
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type loginProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPageComponent: React.FC<loginProps> = ( { setSignedIn } ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginAttempt = async () => {
    if (username && username.trim() !== '' && password && password.trim() !== '') {
      try {
        const resBody = {
          username: username,
          password: password
        };

        const res = await fetch('/api/account/login', {
            method: 'POST' ,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(resBody), 
          });
        if (!res.ok) {
          throw new Error('Login failed'); 
        }
        toast.success('Successfully logged in!');
        setSignedIn(true); 
        navigate("/");
      } catch (error) {
        toast.error('Login failed.');
      }
    } else {
      toast.error('Invalid username and password.');
    }
    setUsername('');
    setPassword('');
  }
  return (
    <>

      <div className="login">
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
        <Button variant="contained" onClick={loginAttempt}>Log In</Button>
        </div>
      </div>
    </>
  );
}



const LoginComponent: React.FC = () => {
  const { signedIn, setSignedIn } = useAuth();

  return (
    <>
      <ToastContainer />
      {!signedIn && (
        <Container>
          <Row className="mt-3">
            <Col>
              <h2>Login to EdStemLite!</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <LoginPageComponent setSignedIn={setSignedIn} />
            </Col>
          </Row>
          <Row className="mt-3">
              <div>
                <h3>Dont have an account?</h3>
                <Button variant="contained">
                  <Link to={`/signup`}>Sign up</Link>
                </Button>
              </div>
          </Row>
        </Container>
      )}
    </>
  );
}

export default LoginComponent;
