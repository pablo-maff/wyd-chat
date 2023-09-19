import { formatDistanceToNow, parseISO } from 'date-fns';
import clsx from 'clsx';

export function ContactInfo({ typing, lastMessage, showLastMessageTime, selectedChat }) {
  const formattedTimePassed = showLastMessageTime && lastMessage?.timestamp && formatDistanceToNow(parseISO(lastMessage?.timestamp));

  return (
    <>
      {typing ?
        <h6 className={clsx(selectedChat && !showLastMessageTime ? 'text-white' : 'text-blueChat-300')}>Typing ...</h6>
        :
        <>
          {
            !showLastMessageTime && lastMessage ?
              <p className='text-sm line-clamp-1'>{lastMessage?.message}</p >
              :
              formattedTimePassed ?
                <p className='text-sm line-clamp-1'>Last seen {formattedTimePassed} ago</p>
                :
                 
                <p className='text-sm line-clamp-1'>New User</p>
          }
        </>
      }
    </>
  )
}