import clsx from 'clsx';
import React from 'react';

export function Sidebar({
  chats = [
    {
      id: 1,
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/921.jpg',
      name: 'Pablo',
      lastMessage: 'Hola amigos!',
    },
  ],
  activeChat = true,
  setActiveChat,
}) {
  return (
    <>
      <div className='sidebar flex flex-col w-[22rem] h-screen items-center pt-10 gap-6 bg-blue-100 px-8'>
        <div className='sidebar-header font-bold text-2xl self-start'>
          <h2>Your Chats</h2>
        </div>
        <div className='chat-list'>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={clsx(
                'chat-item flex flex-row flex-nowrap items-center gap-4 w-[21em] p-2 bg-white',
                chat.id === activeChat.id ? 'active' : ''
              )}
              onClick={() => setActiveChat(chat)}
            >
              <div className='chat-avatar rounded-full h-12 w-12 overflow-hidden'>
                <img src={chat.avatar} alt={`${chat.name}'s avatar`} />
              </div>
              <div className='chat-info'>
                <h3 className='font-bold text-lg'>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
