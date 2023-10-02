import { Avatar } from './Avatar';
import { ContactInfo } from './ContactInfo';
import { ContactName } from './ContactName';
import clsx from 'clsx';

export function Contact({ name, avatar, lastMessage, selectedChat, typing, showLastSeen, isOnline }) {
  return (
    <div className={clsx('flex items-center', selectedChat && 'transition delay-100 bg-blueChat-300 text-white rounded-lg')}>
      <div className="px-2 py-1 mr-2">
        <Avatar avatar={avatar} typing={typing} isOnline={isOnline} />
      </div>
      <div>
        <ContactName name={name} />
        <ContactInfo
          typing={typing}
          lastMessage={lastMessage}
          showLastSeen={showLastSeen}
          selectedChat={selectedChat}
        />
      </div>
    </div>
  )
}