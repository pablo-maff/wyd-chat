import { faker } from '@faker-js/faker';
import Chat from '../components/Chat';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Header } from '../components/Header/Header';

// TODO: Put name and avatar inside user object, add user id and other user fields
const chats = [
  {
    id: "1",
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  },
  {
    id: "2",
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  },
];

function Main() {
  const { id } = useParams()
  const [selectedChat, setSelectedChat] = useState(undefined)

  useEffect(() => {
    console.log("Setting selected chat")
    setSelectedChat(chats.find(chat => chat.id === id))
  }, [id])

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={chats} activeChatId={selectedChat?.id} />
      {selectedChat &&
        <div className='flex flex-1 flex-col'>
          <Header chat={selectedChat} />
          <Outlet />
        </div>
      }
    </div>
  );
}

export default Main;
