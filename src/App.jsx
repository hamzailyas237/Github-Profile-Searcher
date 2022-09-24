import axios from 'axios';
import './App.css';
import profile from './images/profile.png'
import errorImg from './images/error.png'
import { useState, useEffect } from 'react'

function App() {

  const [input, setInput] = useState('')
  const [userData, setUserData] = useState('')
  const [callApi, setCallApi] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    axios.get(`https://api.github.com/users/${input ? input.split(" ").join("") : 'usama1'}`)
      .then(response => {
        setUserData(response.data)
        setError(false)
      })
      .catch(err => {
        console.log(err);
        setError(true)
      })
  }, [callApi])


  // without useEffect
  // const getUsers = () => {
  //   axios.get(`https://api.github.com/users/${input ? input : 'jaffaraman'}`)
  //     .then(response => {
  //       setUserData(response.data)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setError(true)
  //     })
  // }

  const handleForm = (e) => {
    e.preventDefault();
    setCallApi(!callApi)
    // getUsers()
  }


  return (
    <div className="App">

      <form onSubmit={handleForm}>
        <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='Search github user by username' />
      </form>

      {
        error ?
          <div style={{marginTop: '30px'}}>
            <img src={errorImg} />
          </div>
          :
          <div className='card-container'>

              <img src={userData.avatar_url ? userData.avatar_url : profile} />

              <div className='card-inner-container'>
                <p>Name: {userData.name ? userData.name : 'not added'}</p>
                <p>Bio: {userData.bio ? userData.bio : 'not added'}</p>
                <p>Followers: {userData ? userData.followers : 'abc'}</p>
                <p>Following: {userData ? userData.following : 'abc'}</p>
                <p>Public Repo's: {userData ? userData.public_repos : 'abc'}</p>
              </div>

          </div>
      }

    </div>
  );
}

export default App;
