import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createChatRoomMessage } from '../../redux/reducers/userChatsReducer';

function Chat() {
  const { id } = useParams()

  const { user } = useSelector(state => state.userAuthentication)
  const activeChat = useSelector((state) => state.userChats).data.activeChat

  const dispatch = useDispatch()

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
    <div className='flex flex-col h-full' >
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
