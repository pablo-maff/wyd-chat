import { Header } from "~/components/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { faker } from '@faker-js/faker';
import { Message } from "../components/Message";

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
      <div className="pt-10 px-60">
        <Message user={"user"} messageTime={faker.date.anytime()} />
      </div>
    </>
  )
}