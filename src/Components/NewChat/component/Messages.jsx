import React,{useContext,useState,useEffect} from 'react'
import Message from './Message'
import { ChatContext } from "../context/ChatContext";
import db, { auth } from '../../../firebase';
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
 

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  // console.log(name)
  console.log(messages)
  console.log("hello")

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))} 

         
    </div>
  )

  
}

export default Messages









  