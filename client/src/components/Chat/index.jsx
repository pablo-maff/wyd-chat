import { useEffect, useState } from 'react';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useParams } from 'react-router';
import ChatInstance from '../../services/ChatInstance';
import { useOutletContext } from 'react-router-dom';

function Chat() {
  const { contactId } = useOutletContext()
  const { id } = useParams()

  const [chatMessages, setChatMessages] = useState(undefined)

  useEffect(() => {
    ChatInstance.get(`/chatRooms/${id}/messages`)
      .then(response => {
        setChatMessages(response.data)
      })
  }, [id])

  function submitNewMessage(text) {
    const newMessage = {
      from: '6505d15550461292ea9630b5', // TODO: Change hardcoded user id to work dynamically after implementing proper user details storage
      to: contactId,
      text,
      chatRoomId: id
    }

    ChatInstance.post('/chatRooms/:id/messages', newMessage)
      .then(response => {
        setChatMessages(prevState => [...prevState, response.data])
      })
  }

  return (
    <div className='flex flex-col h-full bg-blueChat-50' >
      {chatMessages &&
        <>
          <div className='flex-grow'>
            <div className='relative flex flex-col h-full'>
              <MessagesList messages={chatMessages} />
            </div>
          </div>
          <ChatInput submitNewMessage={submitNewMessage} />
        </>
      }
    </div>
  );
}

export default Chat;
