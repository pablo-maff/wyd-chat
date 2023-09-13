import React from 'react';
import { Contact } from '../Contact'

export function Sidebar({ chats, activeChat, setActiveChat }) {

  return (
    <>
      <div className='sidebar flex flex-col w-[22rem] h-screen items-center pt-10 gap-6 bg-blue-100 px-8'>
        <div className='sidebar-header font-bold text-2xl self-start'>
          <h2>Your Chats</h2>
        </div>
        <ul className='chat-list flex flex-col gap-y-1 w-full'>
          {chats.map((chat) => (
            <li key={chat.id} onClick={() => setActiveChat(chat)} className='hover:cursor-pointer'>
              <Contact
                key={chat.id}
                chat={chat}
                typing={true}
                activeChat={chat.id === activeChat?.id ? true : false}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
