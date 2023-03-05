import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home.module.css';
import SidebarOption from './SidebarOption';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import SearchCommunity from './SearchCommunity.jsx';
import db, { auth } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import Navbar from './Navbar';
import profilePhoto from '../Images/profilePhoto.png';
import ChatScreen_home from './ChatScreen_home';
import ChatHeader from './ChatHeader.jsx';

const Home = () => {
  // React Hooks
  const [channels, setChannels] = useState([]);  // stores total channels in which user is joined in
  const communities = [];

  const [toggleCommunities, setToggleCommunities] = useState(true);


  // Functions
  async function getChannels() {
    // this will get all the channels from database and store in the above variables
    try {
      const querySnapshot = await getDocs(collection(db, "communities"));
      querySnapshot.forEach((doc) => {
        communities.push({ id: doc.id, name: doc.data().name })
        setChannels(communities);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // update the channels whenever the page is loaded
    getChannels();
  }, []);

  // Return statement
  return (
    <>
      <Navbar />
      <div className={styles.homePage}>
        <div>
          <div className={styles.home_sidebar}>
            <div className={styles.home_header}>
              <img src={profilePhoto} alt="profile" className={styles.user_profileIcon} />
              <span style={{ marginLeft: '5px' }}>{auth.currentUser.displayName}</span>
            </div>
            <hr/>
            <SearchCommunity />
            <hr />
            <div className={styles.my_communities} onClick={() => setToggleCommunities(!toggleCommunities)}>
              My Communities {toggleCommunities ? <FaAngleUp onClick={() => setToggleCommunities(!toggleCommunities)} /> : <FaAngleDown onClick={() => setToggleCommunities(!toggleCommunities)} />}
            </div>

            {/* prints all the current communities the user is in */}
            <div className={styles.print_communities}>
              {channels.map((community) => (
                <SidebarOption title={community.name} id={community.id} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.chat_screen}>
          <ChatHeader/>
          <ChatScreen_home/>
        </div>
      </div>
    </>
  )
}

export default Home