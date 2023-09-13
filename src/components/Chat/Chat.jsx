import clsx from 'clsx';

function Chat({ chat }) {
  return (
    <div
      className={clsx(chat ? 'h-full lg:block bg-blue-200 p-8' : 'hidden')}
    >
      <div>Empty Chat</div>
    </div>
  );
}

export default Chat;
