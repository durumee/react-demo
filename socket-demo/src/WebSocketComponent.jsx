import { useState, useRef } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);

  const connectWebSocket = () => {
    const newSocket = new WebSocket('ws://localhost:8080/ws');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('Connected to server');
    };

    newSocket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, `Server: ${message}`]);
    };

    newSocket.onclose = () => {
      console.log('Disconnected from server');
      setSocket(null);
    };
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  const sendMessage = () => {
    const message = messageInputRef.current.value;
    if (message && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      messageInputRef.current.value = '';
    }
  };

  return (
    <div className="container-sm">
      <h1 className="row p-3">WebSocket 메시지 발송</h1>
      <div className="row justify-content-between p-3">
        <button className={`col-5 badge bg-gradient ${socket === null ? 'bg-primary' : 'bg-secondary'}`} onClick={connectWebSocket} disabled={socket !== null}>Connect</button>
        <button className={`col-5 badge bg-gradient ${socket === null ? 'bg-secondary' : 'bg-primary'}`} onClick={disconnectWebSocket} disabled={socket === null}>Disconnect</button>
      </div>
      <div className="row justify-content-between p-3">
        <input className="col-8"
          type="text"
          ref={messageInputRef}
          placeholder="내용을 입력하고 엔터를 입력하세요"
          onKeyUp={(e) => {
            if (e.keyCode === 13) sendMessage();
          }}
        />
        <button className="col-3 align-items-center badge bg-primary bg-gradient" onClick={sendMessage} disabled={socket === null}>Send</button>
      </div>
      <div id="messages">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
