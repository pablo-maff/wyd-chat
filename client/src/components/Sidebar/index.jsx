import { useState } from 'react';
import { Contact } from '../Contact'
import { useDispatch, useSelector } from 'react-redux';
import { activateChat, createUserChatRoomAction } from '../../redux/reducers/userChatsReducer';
import { SidebarHeader } from './SidebarHeader';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai'

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
    <div className='sidebar relative flex flex-col min-w-[22rem] h-screen items-center bg-white'>
      <SidebarHeader />
      <div className='relative h-full w-full'>
        {chats && users &&
          <ul className='chat-list absolute inset-0 overflow-y-scroll overflow-x-hidden flex flex-col gap-y-1 m-2 mr-0'>
            <>
              {!toggleNewChat ?
                <>
                  {chats.map((chat) => {
                    const lastContactMessage = chat?.messages
                      ?.filter(message => message.from !== user.id)
                      .at(-1)

                    return (
                      <li
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg mx-1'
                      >
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
                    <li key={user.id} onClick={() => handleCreateChatRoom(user.id)} className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg'>
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
      <div className='absolute bottom-4 right-5'>
        <div className='bg-blueChat-400 w-14 h-14  rounded-full flex justify-center items-center'>
          <button onClick={handleNewChatView}>
            {!toggleNewChat ?
              <BsFillPencilFill size='1.5rem' color='white' />
              : <AiOutlineClose size='1.5rem' color='white' />
            }
          </button>
        </div>
      </div>
    </div>
  );
}
