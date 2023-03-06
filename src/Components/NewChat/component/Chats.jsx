
// import React, { useState, useEffect } from 'react';
// import db, { auth } from '../../../firebase';
// import { doc, onSnapshot } from 'firebase/firestore';

// import profilePhoto from '../../../Images/profilePhoto.png';

// const Chats = () => {
//   const [chats, setChats] = useState([]);
//   const user = auth.currentUser;
//   useEffect(() => {
//     const getChats = () => {
//   console.log('getChats called');
//       // const user = auth.currentUser;
//       if (user) {
//         const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
//           setChats(doc.data());
//         });
//         return () => {
//           unsub();
//         };
//       }
//     };

//     user.uid && getChats();
//   }, [user.uid]);

//   console.log(chats); // log chats state to console

//   return (
//     <div className='chats'>
      
//       {Object.entries(chats)
//         ?.sort((a, b) => b[1]?.date - a[1]?.date)
//         ?.map((chat) => (
//           <div className='userChat' key={chat[0]}>
//             <img src={profilePhoto} alt='' />
//             <div className='userChatInfo'>
//               <span>{chat[1]?.userInfo?.displayName}</span>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;



import React, { useState, useEffect,useContext } from 'react';
import db, { auth } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

import profilePhoto from '../../../Images/profilePhoto.png';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const user = auth.currentUser;
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (user) {
        const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
          setChats(doc.data());
        });
        return () => {
          unsub();
        };
      }
    };

    user.uid && getChats();
  }, [user.uid]);
 
  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER",payload: u})
  }
  

  return (
    <div className='chats'>
      {
          Object.entries(chats).map((chat,key)=>{
            if(chat[1].displayName){
              console.log(chat[1])
              // const userInfo = chat[1]?.userInfo;
              const displayName = chat[1].displayName || 'Unknown User';
              return(
                <div className='userChat' key={key} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={profilePhoto} alt='' />
                <div className='userChatInfo'>
                  <span>{displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
              )
            }
          })
        }
    </div>
  );
};

export default Chats;