import { faker } from '@faker-js/faker';
import Chat from '../components/Chat';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useState } from 'react';

// TODO: Put name and avatar inside user object, add user id and other user fields
const chats = [
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
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
  const [activeChat, setActiveChat] = useState(undefined)

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className='flex flex-1 flex-col'>
        {activeChat &&
          <Header chat={activeChat} />
        }
        <Chat chatId={activeChat?.id} />
      </div>
    </div>
  );
}

export default Main;
