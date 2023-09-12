import { faker } from '@faker-js/faker';
import Chat from '../components/Chat/Chat';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';

const chats = [
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: faker.lorem.text(),
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: faker.lorem.text(),
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: faker.lorem.text(),
    avatar: faker.internet.avatar(),
  },
  {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    lastMessage: faker.lorem.text(),
    avatar: faker.internet.avatar(),
  },
];

function Main() {
  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={chats} activeChat={true} setActiveChat={() => null} />
      <div className='flex flex-1 flex-col'>
        <Header />
        <Chat />
      </div>
    </div>
  );
}

export default Main;
