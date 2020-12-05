import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Telegram from './components/Telegram';
import { login, logout, selectUser } from './features/counter/userSlice';
import {auth} from './firebase'

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() =>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }))
      } else {
        dispatch(logout())
      }
      console.log(authUser)
    })
  },[dispatch])

  return (
    <div className="App">
      {user ? <Telegram /> : <Login />}
    </div>
  );
}

export default App;
