import { Avatar } from './Avatar';
import { ContactInfo } from './ContactInfo';
import { ContactName } from './ContactName';
import clsx from 'clsx';

export function Contact({ name, avatar, lastMessage, selectedChat, typing, showLastSeen }) {
  return (
    <div className={clsx('flex items-center', selectedChat && 'bg-blueChat-400 text-white')}>
      <div className="p-2 mr-2">
        <Avatar avatar={avatar} typing={typing} />
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