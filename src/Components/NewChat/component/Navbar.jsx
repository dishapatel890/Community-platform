import React, { useContext } from 'react'
// import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import db, { auth } from '../../../firebase';
import profilePhoto from '../../../Images/profilePhoto.png';
import styles from '../../../Styles/Home.module.css';


const Navbar = () => {
    const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chats</span>
      <div className="user">
        <img src={profilePhoto} alt="profile" />
        <span>{auth.currentUser.displayName}</span>
        {/* <img src={profilePhoto} alt="profile" className={styles.user_profileIcon} /> */}


        {/* <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span> */}
        {/* <button>logout</button> */}
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default Navbar