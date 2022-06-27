import { useEffect, useState } from 'react';

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Login from './components/Login';
import Navbar from './components/Navbar';
import Todo from './components/Todo';

import { auth } from './firebase/config';
import { storeUserInfo, updateUser } from './firebase/service';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      let newUser = null;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  const handleImageChanged = async (downlodUrl) => {
    await updateUser(user, downlodUrl);
  };

  if (user)
    return (
      <>
        <Navbar user={user} handleImageChanged={handleImageChanged} logout={logout} />
        <div className="container is-fluid">
          <Todo />
        </div>
      </>
    );
  else return <Login />;
}

export default App;
