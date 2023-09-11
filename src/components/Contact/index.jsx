import { Avatar } from "./Avatar";
import { Typing } from "./Typing";
import { UserName } from "./UserName";

export function Contact({ name, typing }) {
  return (
    <div className="flex items-center">
      <div className="p-2 mr-2">
        <Avatar typing={typing} />
      </div>
      <div>
        <UserName name={name} />
        <Typing typing={typing} />
      </div>
    </div>
  )
}