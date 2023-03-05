import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../Styles/Community.module.css';
import Navbar from './Navbar';
import SearchCommunity from './SearchCommunity';
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import db from '../firebase';
import Cards from './Cards';
import { FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const Community = () => {
  // React Hooks
  const temp = "null";
  const [formData, setFormData] = useState({
    comName: "",
  });

  // React Hooks
  const [communities, setCommunities] = useState([]);
  const community = [];

  const [modal, showModal] = useState(false);


  const { comName } = formData;

  // Functions
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: [e.target.value]
    }));
    console.log(formData);
  }


  if (modal) {
    document.body.classList.add(styles.active_modal);
  }
  else {
    document.body.classList.remove(styles.active_modal);
  }

  // functions
  async function getCommunities() {
    try {
      const querySnapshot = await getDocs(collection(db, "communities"));
      querySnapshot.forEach((doc) => {
        community.push({ id: doc.id, name: doc.data().name, desc: doc.data().desc })
        setCommunities(community);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const AddInCommunity = async(e) => {
    e.preventDefault();

    try {
      // const docRef = await addDoc(collection(db, "channels"), {name: "hello"});
      // console.log("Reference id : " + docRef.id);
      const dbRef = collection(db, "communities");
      const data = {
        name: "cpp"
      };
      addDoc(dbRef, data)
      .then(docRef => {
        console.log(docRef.id);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  {document.body.style.backgroundColor = 'white'}


  // Return statement
  return (
    <>
        <div className={styles.community_body}>
          <Navbar />
          <div className={styles.header}>
            <div className={styles.search_bar}>
              <SearchCommunity />
            </div>
            <div className={styles.add_com}>
              <button className={styles.add_community_btn} onClick={() => showModal(!modal)}>
                Add Community
              </button>
            </div>
          </div>

          <div className={styles.line}>
            {communities.map((community) => (
              <Cards key={community.id} title={community.name} id={community.id} members={community.members} Icon={community.icon} desc={community.desc} />
            ))}
          </div>
        </div>

      {modal &&
        <div className={styles.overlay}>
          <div className={styles.add_community}>
            <form className={styles.community_form} onSubmit={AddInCommunity}>
              <div>
                <button className={styles.close_btn}>
                  <ImCross onClick={() => showModal(!modal)} />
                </button>
              </div>
              <div className={`${styles.row} ${styles.font}`}>
                Add Community
              </div>
              <div className={styles.row}>
                <input type="text" className={styles.input_border} placeholder="Name" id="comName" value={comName} onChange={onChange} />
              </div>
              <div className={styles.row}>
                <input type="text" className={styles.input_border} placeholder="Type" id="null" value={temp} onChange={onChange} />
              </div>
              <div className={styles.row}>  
                <input type="text" className={styles.input_border} placeholder='Description' id="null" value={temp} onChange={onChange}/>
              </div>
              <div className={styles.row}>
                <button type="button"><p className={styles.add_btn}>Add <FaPlus style={{ fontSize: '21px', marginBottom: '4px' }} /></p></button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Community