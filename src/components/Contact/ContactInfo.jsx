import { formatDistanceToNow } from "date-fns";
import clsx from 'clsx';

export function ContactInfo({ typing, lastMessage, showLastMessageTime, activeChat }) {
  const formattedTimePassed = showLastMessageTime && formatDistanceToNow(lastMessage?.timestamp);

  return (
    <>
      {typing ?
        <h6 className={clsx(activeChat && !showLastMessageTime ? "text-white" : "text-blueChat-300")}>Typing ...</h6>
        :
        <>
          {
            !showLastMessageTime ?
              <p className='text-sm line-clamp-1'>{lastMessage?.message}</p >
              :
              <p className='text-sm line-clamp-1'>Last seen {formattedTimePassed} ago</p>
          }
        </>
      }
    </>
  )
}