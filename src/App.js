import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail'
import Login from './Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  const addGrsfScript = () => {
    // GrowSurf Universal Code
    const script = document.createElement('script');
    script.src = 'https://app.growsurf.com/growsurf.js?v=2.0.0';
    // replace <CAMPAIGN_ID> with your GrowSurf campaign ID 
    script.setAttribute('grsf-campaign', '<CAMPAIGN_ID>');
    script.async = true;
    document.head.appendChild(script);
  };
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })  
    // Check if the page has already loaded
  if (document.readyState === "true") {
    addGrsfScript();
  } else {
    window.addEventListener("load", addGrsfScript);
  // Remove the event listener
    return () => window.removeEventListener("load", addGrsfScript);
  }
  }, [])
  
  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App
