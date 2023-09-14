import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useParams } from 'react-router';


function Chat() {
  const { id } = useParams()
  const [chatMessages, setChatMessages] = useState(undefined)

  // TODO: Change "user" for actual user id when user is implemented
  const messagesList = [{
    id: "1",
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
    }]
  },
  {
    id: "2",
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
    }]
  }]

  useEffect(() => {
    console.log("Setting Chat Messages")
    setChatMessages(messagesList.find(messages => messages.id === id)?.messages)
  }, [id])

  return (
    <div className='flex flex-col h-full bg-blueChat-50' >
      {chatMessages &&
        <>
          <div className='flex-grow'>
            <div className='relative flex flex-col h-full'>
              <MessagesList messages={chatMessages} />
            </div>
          </div>
          <ChatInput chatMessages={chatMessages} />
        </>
      }
    </div>
  );
}

export default Chat;
