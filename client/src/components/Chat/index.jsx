import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createChatRoomMessage } from '../../redux/reducers/userChatsReducer';
import { ChatHeader } from './ChatHeader';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import clsx from 'clsx';

function Chat() {
  const { id } = useParams()

  const { sidebarOpen } = useSidebarContext()
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
    <div className={clsx('flex flex-1 flex-col blur-overlay', sidebarOpen && 'hidden md:flex')}>
      <ChatHeader activeChat={activeChat} />
      <div
        id='chat-container'
        className='flex flex-col flex-grow'
      >
        {activeChat.messages &&
          <>
            <MessagesList messages={activeChat.messages} />
            <ChatInput submitNewMessage={submitNewMessage} />
          </>
        }
      </div>
    </div>
  );
}

export default Chat;