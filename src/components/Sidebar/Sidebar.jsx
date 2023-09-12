import React from 'react';
import { Contact } from '../Contact';

export function Sidebar({ chats, activeChat, setActiveChat }) {
    return (
        <>
            <div className="sidebar w-1/3 border-2 border-color-green">
                <div className="sidebar-header">
                    <h2>Your Chats</h2>
                </div>
                <div className="chat-list">
                    {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-item ${chat.id === activeChat.id ? 'active' : ''}`}
                        onClick={() => setActiveChat(chat)}
                    >
                        <Contact name={chat.name} typing={true} />
                    </div>
                    ))}
                </div>  
            </div>
        </>
    )
}