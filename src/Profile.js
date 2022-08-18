import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import { Link } from 'react-router-dom'

function Profile() {

const {currentUser} = useAuthValue()  

// Check to see if GrowSurf is available, then re-initialize GrowSurf to make the embeddable element renders
if (window.growsurf) {
  window.growsurf.init();
}

  return (
      <div className='center'>
        <div className='profile'>
          <h1>Profile</h1>
          <p><strong>Email: </strong>{currentUser?.email}</p>
          <p>
            <strong>Email verified: </strong>
            {`${currentUser?.emailVerified}`}
          </p>
          {/*userEmail passed to the grsf-email data attribute of the embedded form*/}
          <div className='grsfForm' data-grsf-block-form data-grsf-email={currentUser?.email}></div>
          <span onClick={() => signOut(auth)}>Sign Out</span>
          <span><Link to='/login'>Login Page</Link></span>
        </div>
      </div>
  )
}

export default Profile
