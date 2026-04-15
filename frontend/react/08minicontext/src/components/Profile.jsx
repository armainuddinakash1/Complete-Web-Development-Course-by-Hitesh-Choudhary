import { useContext } from 'react'
import UserContext from '../context/UserContext';

const Profile = () => {
    const { user } = useContext(UserContext);
    if(!user) {
        return <div>Please login to view your profile.</div>
    }
  return (
      <div>
          <h1>Profile </h1>
          <div>Username: {user.username}</div>
          <div>Password: {user.password}</div>
      </div>
  );
}

export default Profile