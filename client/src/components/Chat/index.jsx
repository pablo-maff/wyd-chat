import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useParams } from 'react-router';
import ChatInstance from '../../services/ChatInstance';
import { useAuth } from '../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux';
import { createChatRoomMessage } from '../../redux/reducers/userChatsReducer';

function Chat() {
  const { user } = useAuth()
  const { id } = useParams()

  const dispatch = useDispatch()

  const activeChat = useSelector((state) => state.userChats).data.activeChat

  function submitNewMessage(text) {
    const newMessage = {
      from: user.id,
      to: activeChat.contact.id,
      text,
      chatRoomId: id
    }

    dispatch(createChatRoomMessage(newMessage))

  }

  return (
    <div className='flex flex-col h-full bg-blueChat-50' >
      {activeChat.messages &&
        <>
          <div className='flex-grow'>
            <div className='relative flex flex-col h-full'>
              <MessagesList messages={activeChat.messages} />
            </div>
          </div>
          <ChatInput submitNewMessage={submitNewMessage} />
        </>
      }
    </div>
  );
}

export default Chat;
