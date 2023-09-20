import React, { useState } from 'react';
import { Contact } from '../Contact'
import { useNavigate } from 'react-router';
import ChatInstance from '../../services/ChatInstance';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { activateChat } from '../../redux/reducers/userChatsReducer';

export function Sidebar({ chats, setChats, users, activeChatId }) {
  const [toggleNewChat, setToggleNewChat] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSelectChat(chatId) {
    dispatch(activateChat(chatId))
    navigate(`/chat/${chatId}`)
  }

  function handleNewChatView() {
    setToggleNewChat(true)
  }

  function handleCreateChatRoom(contactId) {
    const newChatRoom = {
      users: [user.id, contactId]
    }
    ChatInstance.post('/chatRooms', newChatRoom)
      .then(response => {
        setChats(prevState => [...prevState, response.data])
        setTimeout(() => {
          navigate(`/chat/${response.data.id}`)
        }, 20)
      })
  }

  return (
    <>
      <div className='relative sidebar flex flex-col w-[22rem] h-screen items-center pt-10 gap-6 bg-blueChat-100 px-8'>
        <div className='sidebar-header font-bold text-2xl self-start'>
          <h2>Your Chats</h2>
        </div>
        <div>
          <ul className='chat-list flex flex-col gap-y-1 w-full'>
            <>
              {!toggleNewChat ?
                <>
                  {chats.map((chat) => (
                    <li key={chat.id} onClick={() => handleSelectChat(chat.id)} className='hover:cursor-pointer'>
                      <Contact
                        key={chat?.contact?.id}
                        name={chat?.title}
                        avatar={chat?.contact?.avatarPhoto}
                        lastMessage={chat?.contact?.lastMessage}
                        typing={false}
                        selectedChat={chat.id === activeChatId ? true : false}
                      />
                    </li>
                  ))}
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
        </div>
        <div className='absolute bottom-10 right-4'>
          <button onClick={handleNewChatView} className='bg-blueChat-200'>New Chat</button>
        </div>
      </div>
    </>
  );
}
