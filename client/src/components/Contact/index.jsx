import { Avatar } from './Avatar';
import { ContactInfo } from './ContactInfo';
import { ContactName } from './ContactName';
import clsx from 'clsx';

export function Contact({ name, avatar, showLastMessage, selectedChat, typing, showLastTimeOnline, isOnline, unreadMessages }) {
  return (
    <div className={clsx('flex items-center', selectedChat && 'transition delay-100 bg-blueChat-400 text-white rounded-lg')}>
      <div className="px-2 py-1 mr-2">
        <Avatar avatar={avatar} typing={typing} isOnline={isOnline} />
      </div>
      <div className='overflow-hidden text-ellipsis break-words w-full'>
        <ContactName name={name} />
        <ContactInfo
          typing={typing}
          showLastMessage={showLastMessage}
          showLastTimeOnline={showLastTimeOnline}
          selectedChat={selectedChat}
          isOnline={isOnline}
          unreadMessages={unreadMessages}
        />
      </div>
    </div>
  )
}