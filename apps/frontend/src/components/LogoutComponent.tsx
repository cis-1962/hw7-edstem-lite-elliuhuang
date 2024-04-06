import { useAuth } from '../AuthContext';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LogoutButton = () => {
  const {signedIn, setSignedIn} = useAuth()

  const signOut = async () => {
      try {
        const res = await fetch(`/api/account/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        });
        if (!res.ok) {
          throw new Error('Failed to logout');
        }
        toast.success('Successfully logged out!');
        setSignedIn(false);
      } catch (error) {
        toast.error('Failed to logout.');
      }
    };

  return (
    <>
      {signedIn && <div>
        <Button onClick={signOut} variant={'contained'}>
          Log Out
        </Button>
      </div>}
    </>
  )
}

export default LogoutButton