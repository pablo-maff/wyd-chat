import { Header } from "~/components/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { faker } from '@faker-js/faker';

const chats = [{
  id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  lastMessage: faker.lorem.text(),
  avatar: faker.internet.avatar()
},
{
  id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  lastMessage: faker.lorem.text(),
  avatar: faker.internet.avatar()
},
{
  id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  lastMessage: faker.lorem.text(),
  avatar: faker.internet.avatar()
},
{
  id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  lastMessage: faker.lorem.text(),
  avatar: faker.internet.avatar()
}
]

export function Chat() {
  return (
    <>
        <Header />
        <Sidebar chats={chats} activeChat={true} setActiveChat={() => null} />
    </>
  )
}