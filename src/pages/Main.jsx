import { faker } from '@faker-js/faker';
import Chat from '../components/Chat/Chat';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useState } from 'react';

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
        <Chat chat={activeChat} />
      </div>
    </div>
  );
}

export default Main;
