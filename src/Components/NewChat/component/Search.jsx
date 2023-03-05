// import { async } from '@firebase/util'
// import React, { useState } from 'react'
// import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import profilePhoto from '../../../Images/profilePhoto.png';
// import db, { auth } from '../../../firebase';




// const Search = () => {

//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext)

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {

//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });


//     } catch (err) {
//       setErr(true);
//     }

//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//     const handleSelect = async () => {
//   //     //check whether the group (chat in firestore) exists , if not create
//       const combinedId =
//         currentUser.uid > user.uid
//           ? currentUser.uid + user.uid
//           : user.uid + currentUser.uid;
//       try {
//         const res = await getDoc(doc(db, "chats", combinedId));
//         if (!res.exists()) {
//           //create chat in chats collection
//           await setDoc(doc(db, "chats", combinedId), { messages: [] });
//           // create user chats
//           await updateDoc(doc(db, "userChats", currentUser.uid), {
//             [combinedId + ".userInfo"]: {
//               uid: user.uid,
//               displayName: user.displayName,
//               photoURL: user.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });

//           await updateDoc(doc(db, "userChats", user.uid), {
//             [combinedId + ".userInfo"]: {
//               uid: currentUser.uid,
//               displayName: currentUser.displayName,
//               photoURL: currentUser.photoURL,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });

//         }

//       } catch (err) {}
//       setUser(null);
//       setUsername("")
//       // create user chats
//     }




//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input type="text" placeholder='Find a Friend' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
//       </div>
//       {err && <span>User not found!</span>}
//       {user &&
//         <div className="userChat" onClick={handleSelect} >
//           <img src={profilePhoto} alt="profile" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       }


//     </div>
//   );
// };

// export default Search;








//final search code :===>
// import { async } from '@firebase/util'
// import React, { useState } from 'react'
// import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import profilePhoto from '../../../Images/profilePhoto.png';
// import db, { auth } from '../../../firebase';




// const Search = () => {

//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext)

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {

//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });


//     } catch (err) {
//       setErr(true);
//     }

//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };




//   const handleSelect = async () => {
//     const combinedId =
//       auth.currentUser.uid > user.uid
//         ? auth.currentUser.uid + user.uid
//         : user.uid + auth.currentUser.uid;
//     try {
//       const userChatsDocRef = doc(db, "userChats", currentUser.uid);
//       const userChatsDoc = await getDoc(userChatsDocRef);

//       if (!userChatsDoc.exists()) {
//         // If userChats document doesn't exist, create a new one
//         await setDoc(userChatsDocRef, {});
//       }

//       const userInfo = {
//         uid: user.uid,
//         displayName: user.displayName,
//       };

//       const combinedIdPath = `${combinedId}.userInfo`;
//       const datePath = `${combinedId}.date`;

//       // Update or set the subcollection in userChats document
//       await setDoc(
//         doc(db, "userChats", currentUser.uid),
//         {
//           [combinedIdPath]: userInfo,
//           [datePath]: serverTimestamp(),
//         },
//         { merge: true } // Merge with existing data in the document
//       );

//       await setDoc(
//         doc(db, "userChats", user.uid),
//         {
//           [combinedIdPath]: {
//             uid: auth.currentUser.uid,
//             displayName: auth.currentUser.displayName,
//           },
//           [datePath]: serverTimestamp(),
//         },
//         { merge: true } // Merge with existing data in the document
//       );

//       // Create chat in chats collection
//       const chatDocRef = doc(db, "chats", combinedId);
//       const chatDoc = await getDoc(chatDocRef);

//       if (!chatDoc.exists()) {
//         await setDoc(chatDocRef, { messages: [] });
//       }

//     } catch (err) {
//       console.log(err);
//     }

//     setUser(null);
//     setUsername("");
//   };


//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input type="text" placeholder='Find a Friend' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
//       </div>
//       {err && <span>User not found!</span>}
//       {user &&
//         <div className="userChat" onClick={handleSelect} >
//           <img src={profilePhoto} alt="profile" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       }


//     </div>
//   );
// };

// export default Search;







//user is not found , solved here...
import React, { useState } from 'react'
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import profilePhoto from '../../../Images/profilePhoto.png';
import db, { auth } from '../../../firebase';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setErr(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if (!currentUser) {
      return; // Exit early if user is not logged in
    }
    
    const combinedId =
      auth.currentUser.uid > user.uid
        ? auth.currentUser.uid + user.uid
        : user.uid + auth.currentUser.uid;
    try {
      const userChatsDocRef = doc(db, "userChats", currentUser.uid);
      const userChatsDoc = await getDoc(userChatsDocRef);

      if (!userChatsDoc.exists()) {
        // If userChats document doesn't exist, create a new one
        await setDoc(userChatsDocRef, {});
      }

      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
      };

      const combinedIdPath = `${combinedId}.userInfo`;
      const datePath = `${combinedId}.date`;

      // Update or set the subcollection in userChats document
      await setDoc(
        doc(db, "userChats", currentUser.uid),
        {
          [combinedIdPath]: userInfo,
          [datePath]: serverTimestamp(),
        },
        { merge: true } // Merge with existing data in the document
      );

      await setDoc(
        doc(db, "userChats", user.uid),
        {
          [combinedIdPath]: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
          },
          [datePath]: serverTimestamp(),
        },
        { merge: true } // Merge with existing data in the document
      );

      // Create chat in chats collection
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a Friend' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      {err && <span>User not found!</span>}
      {user &&
        <div className="userChat" onClick={handleSelect} >
          <img src={profilePhoto} alt="profile" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }


    </div>
  );
};

export default Search;
