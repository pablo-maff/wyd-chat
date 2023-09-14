import { Message } from "./Message";

export function MessagesList({ messages }) {
  return (
    <div className='overflow-y-scroll absolute inset-0 p-8'>
      <ul className='flex flex-col'>
        {messages?.map(message =>
          <Message key={message.id} message={message} />
        )}
      </ul>
    </div>
  )
}