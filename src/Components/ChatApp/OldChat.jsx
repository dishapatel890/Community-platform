import React from 'react'
import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";

const Chat = () => {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  useEffect(() => {

    onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()])
    });
  }, []);

  const sendChat = () => {

    const chatRef = push(chatListRef);
    set(chatRef, {
      name, message: msg
    });
    setMsg('')
  }


  return (
    <div>
      {name ? null : <div>
        <input type="text" placeholder='Enter name to start' onBlur={e => setName(e.target.value)} />
      </div>}
      {name ? <div>
        <h3>User:{name}</h3>
        <div className="chat-container">
          {chats.map((c, i) => (
            <div key={i} className={`container ${c.name === name ? 'me' : ''}`}>
              <p className="chatbox">
                <strong>{c.name}: </strong>
                <span>{c.message}</span>
              </p>
            </div>
          ))}
        </div>
        <div className='btm'>
          <input type="text" onInput={e => setMsg(e.target.value)} value={msg}
            placeholder='Enter you chat' />
          <button onClick={e => sendChat()}>send</button>

        </div>

      </div> : null}

    </div>
  )
}

export default Chat
