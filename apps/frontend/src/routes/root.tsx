import useSWR from 'swr';
import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../AuthContext';
import LogoutButton from '../components/LogoutComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


export default function Root() {
  const { signedIn } = useAuth();
  const { data: questions, error } = useSWR('/api/questions/', fetcher, { refreshInterval: 2000 });


  if (error || !questions) return <p>Failed to load questions</p>;

  return (
    <>
      <ToastContainer />
      <div id="sidebar">
        <h1>EdStemLite</h1>
        <LogoutButton/>

        {signedIn && (<><button>
          <Link to={`/addQuestions`}>
            Post new question!
          </Link>
        </button><h4>Sorry couldnt get the modal to popup above everything on the page</h4></>)
        }

        {!signedIn && <button>
          <Link to={`/signup`}>
            Create account to post question!
          </Link>
        </button>}

        <nav>
          <ul>
            {questions.map(question => (
              <li key={question._id}>
                <Link to={`/questionsList/${question._id}`}>{question.questionText}</Link>
              </li>
            ))}
          </ul>

        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>

    </>

  );

}
