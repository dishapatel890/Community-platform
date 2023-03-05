import React, {useContext} from 'react';
import Messages from './Messages.jsx';
import Input from './Input.jsx';
import { ChatContext } from "./context/ChatContext.js";
import './style.scss';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>

       <Messages/>   
       <Input/> 
      
    </div>
  )
}

export default Chat