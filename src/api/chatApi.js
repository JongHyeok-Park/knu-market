const getChat = async (content) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/chatbot?question=' + content);

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

export { getChat };