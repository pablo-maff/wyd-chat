import { useEffect, useRef } from 'react';
import { Message } from './Message';
import { NoSearchResults } from '../NoSearchResults';

export function MessagesList({ messages }) {
  const chatContainerRef = useRef(undefined);

  useEffect(() => {
    // TODO: If user is scrolling the conversation, display a notification and an arrow icon to go to the last message
    // * Scroll to the bottom of the chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      id='messages-list-container'
      className='relative flex flex-col flex-grow'
    >
      <div
        ref={chatContainerRef}
        className='absolute bottom-2 inset-0 overflow-y-scroll overflow-x-hidden p-8'
      >
        {messages.length > 0 ?
          <ul className='flex flex-col'>
            {messages?.map(message =>
              <Message key={message.id} message={message} />
            )}
          </ul>
          :
          <NoSearchResults />
        }
      </div>
    </div>
  )
}