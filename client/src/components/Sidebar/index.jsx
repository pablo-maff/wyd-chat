import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateChat, createUserChatRoomAction } from '../../redux/reducers/userChatsReducer';
import { SidebarHeader } from './SidebarHeader';
import { ChatsList } from './ChatsList';
import { ContactsList } from './ContactsList';
import { ToggleSidebarView } from './ToggleSidebarView';

export function Sidebar() {
  const [toggleNewChat, setToggleNewChat] = useState(false)

  const { data: chatsData } = useSelector(state => state.userChats)
  const { data: usersData } = useSelector(state => state.userContacts)
  const { user } = useSelector(state => state.userAuthentication)

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
    }
    setToggleNewChat(false)
  }

  return (
    <div
      id='sidebar-container'
      className='relative min-w-[22rem] flex flex-grow-0 flex-col items-center bg-white'
    >
      <SidebarHeader />
      <div
        id='list-container'
        className='relative w-full h-full'
      >
        {chatsData?.chatRooms && usersData &&
          <ul
            id='chat-list'
            className='absolute inset-0 overflow-y-scroll flex flex-col gap-y-1 m-2 mr-0'
          >
            <>
              {!toggleNewChat ?
                <ChatsList />
                :
                <ContactsList handleCreateChatRoom={handleCreateChatRoom} />
              }
            </>
          </ul>
        }
      </div>
      <ToggleSidebarView handleNewChatView={handleNewChatView} toggleNewChat={toggleNewChat} />
    </div>
  );
}
