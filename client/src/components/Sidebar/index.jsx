import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateChat, createUserChatRoomAction } from '../../redux/reducers/userChatsReducer';
import { SidebarHeader } from './SidebarHeader';
import { ChatsList } from './ChatsList';
import { ContactsList } from './ContactsList';
import { ToggleSidebarView } from './ToggleSidebarView';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import clsx from 'clsx';
import { Settings } from './Settings';
import { useSearch } from '../../hooks/useSearch';

export function Sidebar() {
  const [showSettings, setShowSettings] = useState(false)
  const [toggleNewChat, setToggleNewChat] = useState(false)

  const { sidebarOpen, toggleSidebar } = useSidebarContext()

  const { data: chatsData } = useSelector(state => state.userChats)
  const { data: usersData } = useSelector(state => state.userContacts)
  const { user } = useSelector(state => state.userAuthentication)

  const { filteredData: filteredUsersData, searchInput: usersSearchInput } = useSearch(usersData, 'fullName', 'full name')
  const { filteredData: filteredChatsData, searchInput: chatsSearchInput } = useSearch(chatsData?.chatRooms, 'title', 'full name')

  const dispatch = useDispatch()

  function handleNewChatView() {
    setToggleNewChat(!toggleNewChat)
  }

  function handleCreateChatRoom(contactId) {
    const existingChat = chatsData?.chatRooms?.find(chat => chat.contact.id === contactId)

    if (!existingChat) {
      const newChatRoom = {
        members: [user.id, contactId]
      }

      dispatch(createUserChatRoomAction(newChatRoom))
    } else {
      dispatch(activateChat(existingChat.id))
      handleNewChatView()
      toggleSidebar(false)
    }
    setToggleNewChat(false)
    toggleSidebar(false)
  }

  function handleShowSettings() {
    setShowSettings(!showSettings)
  }

  return (
    <div
      id='sidebar-container'
      className={clsx('min-w-[22rem] relative flex-grow-0 flex-col items-center bg-white', chatsData?.activeChat && !sidebarOpen ? 'hidden md:flex' : 'flex min-w-full md:min-w-[22rem]')}
    >
      {!showSettings &&
        <SidebarHeader handleShowSettings={handleShowSettings} />
      }
      <div className='w-full p-2'>
        {!toggleNewChat ?
          chatsSearchInput
          :
          usersSearchInput
        }
      </div>
      <div
        id='list-container'
        className='relative w-full h-full bg-slate-100'
      >
        {!showSettings ?
          <>
            {filteredChatsData && filteredUsersData &&
              <ul
                id='chat-list'
                className='absolute inset-0 overflow-y-scroll flex flex-col gap-y-1 mt-1 mr-0'
              >
                {!toggleNewChat ?
                  <ChatsList filteredChatsData={filteredChatsData} />
                  :
                  <ContactsList
                    filteredUsersData={filteredUsersData}
                    handleCreateChatRoom={handleCreateChatRoom}
                  />
                }
              </ul>
            }
          </>
          :
          <Settings
            user={user}
            handleShowSettings={handleShowSettings}
          />
        }
      </div>
      {!showSettings &&
        <ToggleSidebarView
          handleNewChatView={handleNewChatView}
          toggleNewChat={toggleNewChat}
        />
      }
    </div>
  );
}
