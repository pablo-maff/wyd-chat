import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useSelector } from 'react-redux';
import { ChatHeader } from './ChatHeader';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import clsx from 'clsx';

function Chat() {
  const { sidebarOpen } = useSidebarContext()
  const activeChat = useSelector((state) => state.userChats).data.activeChat

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
            <ChatInput />
          </>
        }
      </div>
    </div>
  );
}

export default Chat;
