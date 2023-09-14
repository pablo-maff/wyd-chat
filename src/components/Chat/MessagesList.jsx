import { Message } from "./Message";

export function MessagesList({ messages }) {
  return (
    <div className='absolute bottom-2 inset-0 overflow-y-scroll overflow-x-hidden p-8'>
      <ul className='flex flex-col'>
        {messages?.map(message =>
          <Message key={message.id} message={message} />
        )}
      </ul>
    </div>
  )
}