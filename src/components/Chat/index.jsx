import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';


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
    <div className='flex flex-col h-full  bg-blue-200'>
      <div className='flex-grow w-full'>
        <div className={clsx(chatId ? 'relative h-full' : 'hidden', 'flex flex-col')}>
          <MessagesList messages={chatMessages} />
        </div>
      </div>
      <ChatInput />
    </div>
  );
}

export default Chat;
