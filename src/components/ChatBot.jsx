import { useState } from 'react';
import './ChatBot.css';

function ChatBot(props) {
  let [onChat, setOnChat] = useState(false);

  return (
    <div className="chatbot-wrapper">
      {
        onChat ? (
          <div className={'chabot-message-container ' + (onChat ? 'chat-open' : '')}>
            <div className='chatbot-message-header'>
              <button className='chatbot-close-btn' onClick={() => {
                setOnChat(false);
              }}>
                <img src={require('../image/close_icon.png')} alt="" />
              </button>
            </div>
          </div>
        ) : (
          <div className="chatbot-icon" onClick={() => {
            setOnChat(true);
          }}>
            <img className='chatbot-icon-image' src={require('../image/bot_message.png')} alt="bot_icon" />
          </div>
        )
      }
      
      
    </div>
  )
}

export default ChatBot;