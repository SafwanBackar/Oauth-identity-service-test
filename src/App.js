import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {

  const [user, setUser] = useState({})

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential)
    console.log(userObject);
    setUser(userObject)
    document.getElementById("renderBtn").hidden = true
  }

  const handleSignOut = () =>{
    setUser({})
    document.getElementById("renderBtn").hidden = false
  }

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: '765533300076-ngj0ftef7n00e5ff3mmva7tl96jbnh02.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('renderBtn'),
      {theme: 'outline', size: 'large'}
    ) 

    google.accounts.id.prompt()
  },[])



  return (
    <div className="App">
      <div id='renderBtn'></div>
      {Object.keys(user).length !== 0 && <div><button onClick={(e)=>{handleSignOut(e)}}>Sign Out</button></div>}
      {user && 
      <>
        <div><img src={user.picture} alt="" /></div> 
        <h3>{user.name}</h3>
      </>  
      }
    </div>
  );
}

export default App;
