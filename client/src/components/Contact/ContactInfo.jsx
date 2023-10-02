import { formatDistanceToNow, parseISO } from 'date-fns';
import clsx from 'clsx';

export function ContactInfo({ typing, lastMessage, showLastSeen, selectedChat }) {
  const formattedTimePassed = showLastSeen && showLastSeen && formatDistanceToNow(parseISO(showLastSeen));

  return (
    <>
      {typing ?
        <h6 className={clsx(selectedChat && !showLastSeen ? 'text-white' : 'text-blueChat-300')}>Typing ...</h6>
        :
        <>
          {
            !showLastSeen && lastMessage ?
              <p className='text-md line-clamp-1 font-extralight'>{lastMessage?.text}</p>
              :
              formattedTimePassed ?
                <p className='text-sm line-clamp-1 font-extralight'>Last seen {formattedTimePassed} ago</p>
                :
                <p className='text-md line-clamp-1 font-extralight'>New User</p>
          }
        </>
      }
    </>
  )
}