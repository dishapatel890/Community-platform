import React from 'react';
import styles from '../Styles/ChatHeader.module.css';
import react from '../Images/react.png';

const ChatHeader = () => {
  return (
    <div className={styles.chat_header}>
        <img src={react} alt="profile" className={styles.channel_icon}/><h2>React</h2>
    </div>
  )
}

export default ChatHeader