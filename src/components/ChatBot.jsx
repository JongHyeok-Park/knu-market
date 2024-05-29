import { useEffect, useState } from 'react';
import './ChatBot.css';
import BotChatItem from './BotChatItem';
import UserChatItem from './UserChatItem';

function ChatBot(props) {
  let [onChat, setOnChat] = useState(false);
  let [chatList, setChatList] = useState([]);

  const onSubmitContent = (e) => {
    let input = document.getElementById('chat-input');
    let content = input.value;
    input.value = '';
    if (content.length > 0) {
      let chatListCopy = [...chatList];
      chatListCopy.push({
        isBot: false,
        content: content
      })

      chatListCopy.push({
        isBot: true,
        content: content
      })

      setChatList(chatListCopy);
    }
  }

  const onKeydownHandler = (e) => {
    let button = document.getElementById('chat-send-btn');
    if (e.key === 'Enter') {
      button.click();
    }
  }

  useEffect(() => {
    let messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTo({left: 0, top: messageContainer.scrollHeight, behavior: 'smooth'});
    }
  }, [chatList, onChat]);

  return (
    <div className="chatbot-wrapper">
      {
        onChat ? (
          <div className={'chabot-message-container ' + (onChat ? 'chat-open' : '')}>
            <div className='chatbot-message-header'>
              <h4>고객상담</h4>
              <button className='chatbot-close-btn' onClick={() => {
                setOnChat(false);
              }}>
                <img src={require('../image/close_icon.png')} alt="" />
              </button>
            </div>
            <div className='chatbot-message-contents' id='message-container'>
              {
                chatList.map((item, i) => {
                  if (item.isBot) {
                    return <BotChatItem content={item.content} key={i} />
                  }
                  return <UserChatItem content={item.content} key={i} />
                })
              }
            </div>
            <div className="chat-input-wrapper">
              <input type="text" name="chat" id="chat-input" onKeyUp={onKeydownHandler}/>
              <button type="button" id='chat-send-btn' className="chat-send-btn" onClick={onSubmitContent}>
                <img src={require('../image/send_icon.png')} alt="send_icon" />
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