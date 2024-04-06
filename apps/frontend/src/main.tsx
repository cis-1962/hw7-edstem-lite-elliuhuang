import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './components/LoginComponent';
import SignupPage from './components/SignupComponent';
import NewQuestionsComponent from './components/NewQuestionsComponent';
import { createHashRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import QuestionPage from './components/QuestionComponent';
import './index.css';
import Root from "./routes/root";
import { AuthProvider } from './AuthContext';

const router = createHashRouter([
  {

    path: "/",
    element: <Root />,
    children: [
      {
        path: "addQuestions",
        element: <NewQuestionsComponent/>
      },
      {
        path: "questionsList/:questionId",
        element: <QuestionPage/>
      },
    ],
  },
  {
    path: "signup",
    element: <SignupPage/>
  },
  {
    path: "login",
    element: <LoginPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

