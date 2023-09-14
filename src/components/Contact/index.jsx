import { Avatar } from "./Avatar";
import { ContactInfo } from "./ContactInfo";
import { UserName } from "./UserName";
import clsx from 'clsx';

export function Contact({ chat, selectedChat, typing, showLastMessageTime = false }) {
  return (
    <div className={clsx("flex items-center", selectedChat && "bg-blueChat-400 text-white")}>
      <div className="p-2 mr-2">
        <Avatar avatar={chat?.avatar} typing={typing} />
      </div>
      <div>
        <UserName name={chat?.name} />
        <ContactInfo
          typing={typing}
          lastMessage={chat?.lastMessage}
          showLastMessageTime={showLastMessageTime}
          selectedChat={selectedChat}
        />
      </div>
    </div>
  )
}