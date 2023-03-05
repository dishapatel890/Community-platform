import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db, { auth } from '../firebase';
import styles from '../Styles/Login.module.css';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import Navbar from './Navbar';
// {/* Displays the profile tab when clicked
// -> Contains: My Profile (Change Icon, Change Username), Change Password, Logout */}

const Profile = () => {

  {document.body.style.backgroundColor = 'var(--lightColor)'}
  // React hooks
  const [formData, setFormData] = useState({
    // used to print the name and email of loggedIn current user on profile page.
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const [changeDetail, setChangeDetail] = useState(false);  // option to changeDetail

  const { name, email } = formData;
  const navigate = useNavigate();


  // Functions
  function signOut() {
    // when clicked on signOut it will sign-out the current user and redirect to log-in page
    auth.signOut();
    navigate('/log-in');
  }

  function editName(e) {
    // store the changed username in variable when the username is typed in input box
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    // update the username in authentication and firestore database
    try {
      if (auth.currentUser.displayName) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  // Return statement
  return (
    <>
    <Navbar/>
    <div className={styles.loginForm} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3%', border: '4px solid var(--primaryDarkColor)'}}>
      <form>
        <div className={styles.row} style={{width: '500px'}}>
          <input type="text" id="name" value={name} disabled={!changeDetail} onChange={editName} />
        </div>
        <div className={styles.row}>
          <input type="email" id="email" value={email} disabled />
        </div>
        <div className={styles.row} style={{ margin: 'auto 40%' }}>
          <button onClick={signOut} style={{width: '220px'}}>Sign out</button>
        </div>
        <div className={styles.row} style={{paddingBottom: '30px', width: '280px', margin: 'auto'}}>
          <button type='button' onClick={() => { changeDetail && onSubmit(); setChangeDetail(!changeDetail); }}>{changeDetail ? "Update Username" : "Edit Username"}</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Profile