import React from 'react';

export function Sidebar({ chats, activeChat, setActiveChat }) {
    return (
        <>
            <div className="sidebar">
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
                        <div className="chat-avatar">
                        <img src={chat.avatar} alt={`${chat.name}'s avatar`} />
                        </div>
                        <div className="chat-info">
                        <h3>{chat.name}</h3>
                        <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}