import { formatDistanceToNow, parseISO } from 'date-fns';
import clsx from 'clsx';

export function ContactInfo({ typing, showLastMessage, showLastTimeOnline, selectedChat, isOnline, unreadMessages }) {
  const formattedLastTimeOnline = showLastTimeOnline && formatDistanceToNow(parseISO(showLastTimeOnline));

  if (typing) {
    return (
      <h6
        className={clsx(selectedChat && !showLastTimeOnline ? 'text-white animate-pulse' : 'text-blueChat-300 animate-pulse')}
      >
        Typing...
      </h6>
    )
  }

  if (isOnline && !showLastMessage) {
    return (
      <h6 className='text-blueChat-300 font-medium' >
        Online
      </h6>
    )
  }

  if (formattedLastTimeOnline) {
    return (
      <p className='text-sm line-clamp-1 font-extralight'>
        Last seen {formattedLastTimeOnline} ago
      </p>
    )
  }

  if (showLastMessage) {
    return (
      <div className='flex w[100%]'>
        <p className='text-md line-clamp-1 font-extralight'
        >
          {showLastMessage.text || showLastMessage.file.name}
        </p>
        <div className='bg-blue-400 rounded-full mr-2 text-white ml-auto'>
          <p className='w-6 h-6 text-center'>{unreadMessages}</p>
        </div>
      </div>
    )
  }

  return (
    <p className={clsx(!selectedChat && 'text-blueChat-300', 'text-md', 'font-medium')}>
      New User
    </p>
  )
}