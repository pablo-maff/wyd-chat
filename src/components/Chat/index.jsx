import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MessagesList } from './MessagesList';


function Chat({ chatId }) {
  const [chatMessages, setChatMessages] = useState(undefined)

  // TODO: Change "user" for actual user id when user is implemented
  const messagesList = [{
    id: chatId,
    messages: [{
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: "user"
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: "user"
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    }
    ]
  }]

  useEffect(() => {
    setChatMessages(messagesList.find(messages => messages.id === chatId).messages)
  }, [chatId])

  return (
    <div className={clsx(chatId ? 'relative h-full  bg-blue-200' : 'hidden')}>
      <MessagesList messages={chatMessages} />
    </div>
  );
}

export default Chat;
