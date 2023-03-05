import React ,{useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../context/ChatContext";

// import OldChat from'./OldChat' 

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
      <span>My Chat</span> 

         <span>{data.user?.displayName}</span> 
      </div>

       <Messages/>   
       <Input/> 
      
    </div>
  )
}

export default Chat