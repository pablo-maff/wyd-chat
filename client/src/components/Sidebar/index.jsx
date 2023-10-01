import { useState } from 'react';
import { Contact } from '../Contact'
import { useDispatch, useSelector } from 'react-redux';
import { activateChat, createUserChatRoomAction } from '../../redux/reducers/userChatsReducer';
import { logoutUser } from '../../redux/reducers/userAuthenticationReducer';
import { SidebarHeader } from './SidebarHeader';

export function Sidebar({ chats, users, activeChatId }) {
  const [toggleNewChat, setToggleNewChat] = useState(false)

  const { user } = useSelector(state => state.userAuthentication)
  const { typingUsersById, onlineUsersById } = useSelector(state => state.userContacts)

  const dispatch = useDispatch()

  function handleSelectChat(chatId) {
    dispatch(activateChat(chatId))
  }

  function handleNewChatView() {
    setToggleNewChat(!toggleNewChat)
  }

  function handleCreateChatRoom(contactId) {
    const existingChat = chats?.find(chat => chat.contact.id === contactId)

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

  // TODO: Refactor into smaller components
  return (
    <div className='relative sidebar flex flex-col w-[22rem] h-screen items-center gap-6 bg-blueChat-100'>
      <SidebarHeader />
      <div className='w-full  '>
        {chats && users &&
          <ul className='chat-list flex flex-col gap-y-1 m-2'>
            <>
              {!toggleNewChat ?
                <>
                  {chats.map((chat) => {
                    const lastContactMessage = chat?.messages
                      ?.filter(message => message.from !== user.id)
                      .at(-1)

                    return (
                      <li key={chat.id} onClick={() => handleSelectChat(chat.id)} className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg'>
                        <Contact
                          key={chat?.contact?.id}
                          name={chat?.title}
                          avatar={chat?.contact?.avatarPhoto}
                          lastMessage={lastContactMessage}
                          typing={typingUsersById.includes(chat?.contact?.id)}
                          selectedChat={chat.id === activeChatId ? true : false}
                          isOnline={onlineUsersById.includes(chat?.contact?.id)}
                        />
                      </li>
                    );
                  })}
                </>
                :
                <>
                  {users.map((user) => (
                    <li key={user.id} onClick={() => handleCreateChatRoom(user.id)} className='hover:cursor-pointer'>
                      <Contact
                        key={user.id}
                        name={`${user?.firstName} ${user?.lastName}`}
                        avatar={user?.avatarPhoto}
                        showLastSeen={user?.lastTimeOnline}
                      />
                    </li>
                  ))}
                </>
              }
            </>
          </ul>
        }
      </div>
      <div className='absolute bottom-10 right-4'>
        <button onClick={handleNewChatView} className='bg-blueChat-200'>{!toggleNewChat ? 'New Chat' : 'Your Chats'}</button>
      </div>
    </div>
  );
}
