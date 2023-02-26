import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { TokenContext } from './helper/TokenContext';
import RouterConfig from "./components/routes/RouterConfig";
import Navbar from './components/Navbar'
import Sidebar from './components/Dashboard/Sidebar'

function App() {
  const [processToken, setProcessToken] = useState(false)
  const [isToken, setIsToken] = useState()
  const [userValidate, setUserValidation] = useState()
  const sidebar = useRef(null)
  function openSidebar() {
    sidebar.current.classList.add("open")
  }

  function closeSidebar() {
    sidebar.current.classList.remove("open")
  }
  useEffect(() => {
    async function checkToken() {
      if (JSON.parse(localStorage.getItem('user'))) {
        const res = await fetch(`${process.env.React_App_API_URL}/users/${JSON.parse(localStorage.getItem('user'))._id}`)
        const result = await res.json()
        if (result.status === 200) {
          setUserValidation(true)
          setProcessToken(true)
        } else {
          setUserValidation(false)
          setProcessToken(true)
        }
      } else {
        setUserValidation(false)
        setProcessToken(true)
      }
    }
    checkToken()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token') && userValidate) {
      setIsToken(true)
      setProcessToken(true)
    } else {
      setIsToken(false)
    }
  }, [userValidate])
  return (
    <div className="App">
      <TokenContext.Provider value={{ isToken, setIsToken, setUserValidation }} >
        {processToken &&
          <><Navbar openSidebar={openSidebar} />
            <div ref={sidebar} className='sidebar'>
              <Sidebar closeSidebar={closeSidebar} />
            </div></>
        }
        <main>
          {processToken && <RouterConfig />}
        </main>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
