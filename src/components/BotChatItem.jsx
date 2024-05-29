import { useEffect, useState } from 'react';
import { getChat } from '../api/chatApi';
import './BotChatItem.css';

function BotChatItem(props) {
  let [response, setResponse] = useState();

  const handleChat = () => {
    getChat(props.content)
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        setResponse(error.message);
      })
  }

  useEffect(() => {
    handleChat();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat-item bot">
      <div className="chat-image-wrapper">
        <img className="chat-image" src={require('../image/bot_message.png')} alt="" />
      </div>
      <div className="chat-content">
        { response ? response : 'loading...' }
      </div>
    </div>
  )
}

export default BotChatItem;