import React from 'react';
import { Contact } from '../Contact'
import { useNavigate } from 'react-router';

export function Sidebar({ chats, activeChatId }) {
  const navigate = useNavigate()

  function handleSelectChat(chatId) {
    navigate(`/chat/${chatId}`)
  }

  return (
    <>
      <div className='sidebar flex flex-col w-1/3 h-screen items-center pt-10 gap-6 bg-blueChat-100 px-8'>
        <div className='sidebar-header font-bold text-2xl self-start'>
          <h2>Your Chats</h2>
        </div>
        <ul className='chat-list flex flex-col gap-y-1 w-full'>
          {chats.map((chat) => (
            <li key={chat.id} onClick={() => handleSelectChat(chat.id)} className='hover:cursor-pointer'>
              <Contact
                key={chat.id}
                chat={chat}
                typing={true}
                selectedChat={chat.id === activeChatId ? true : false}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
