function UserChatItem(props) {
  return (
    <div className="chat-item">
      <div className="chat-content">
        { props.content }
      </div>
    </div>
  )
}

export default UserChatItem;