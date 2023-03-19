// import React ,{useContext} from 'react'
// import Messages from './Messages'
// import Input from './Input'
// import { ChatContext } from "../context/ChatContext";

// // import OldChat from'./OldChat' 

// const Chat = () => {
//   const { data } = useContext(ChatContext);

//   return (
//     <div className='chat'>
//       <div className="chatInfo">
//          <span>{data.user?.displayName}</span> 
//       </div>

//        <Messages/>   
//        <Input/> 

//     </div>
//   )
// }

// export default Chat



import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [name, setName] = useState("");

  useEffect(() => {
    getName();
  }, [data]);
  const getName = async () => {
    const name = await data;
    console.log(name)
    if (name) {
      setName(name.user.displayName);
      return name.user.displayName;
    }
    return "";
  };
  
  return (
    <div className="chat">
      <div className="chatInfo">

        <span>{name}</span>
      </div>

       <Messages />
      <Input /> 
    </div>
  );
};

export default Chat;