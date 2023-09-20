import { Sidebar } from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Header } from '../components/Header/Header';
import ChatInstance from '../services/ChatInstance';

function Main() {
  const { id } = useParams()
  const [chats, setChats] = useState(undefined)
  const [selectedChat, setSelectedChat] = useState(undefined)

  useEffect(() => {
    if (!chats)
      ChatInstance.get('/chatRooms')
        .then(response => {
          setChats(response.data)
        })
  }, [chats])

  useEffect(() => {
    if (chats?.length && id) {
      setSelectedChat(chats.find(chat => chat.id === id))
    }
  }, [chats, id])

  if (!chats) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={chats} activeChatId={selectedChat?.id} />
      {selectedChat ?
        <div className='flex flex-1 flex-col'>
          <Header chat={selectedChat} />
          <Outlet context={{ contactId: selectedChat.contact.id }} />
        </div>
        :
        <div className='w-2/3 bg-blueChat-50' />
      }
    </div>
  );
}

export default Main;
