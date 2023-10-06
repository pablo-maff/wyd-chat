import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useSelector } from 'react-redux';
import { ChatHeader } from './ChatHeader';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import clsx from 'clsx';
import { useSearch } from '../../hooks/useSearch';
import { useEffect, useState } from 'react';

export function Chat() {
  const [showSearchChat, setShowSearchChat] = useState(false)

  const { sidebarOpen } = useSidebarContext()
  const activeChat = useSelector((state) => state.userChats).data.activeChat

  const {
    filteredData,
    searchInput,
    chatInputRef,
    clearSearchValue
  } = useSearch({ data: activeChat.messages, searchKey: 'text', secondarySearchKey: 'file' })

  function handleShowSearchChat() {
    setShowSearchChat(!showSearchChat)
  }

  useEffect(() => {
    if (showSearchChat) {
      return chatInputRef.current.focus()
    }
    clearSearchValue()
  }, [chatInputRef, clearSearchValue, showSearchChat])

  return (
    <div className={clsx('flex flex-1 flex-col blur-overlay', sidebarOpen && 'hidden md:flex')}>
      <ChatHeader activeChat={activeChat} handleShowSearchChat={handleShowSearchChat} />
      <div id='chat-search-container' className={clsx(!showSearchChat && 'hidden', 'w-full p-2')} >
        {searchInput}
      </div>
      <div
        id='chat-container'
        className='flex flex-col flex-grow'
      >
        {activeChat?.messages &&
          <>
            <MessagesList messages={filteredData} />
            <ChatInput />
          </>
        }
      </div>
    </div>
  );
}
