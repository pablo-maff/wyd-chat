import { faker } from "@faker-js/faker";
import { format } from "date-fns";

export function Message({ user, messageTime }) {
  const isUserMessage = user === "user"
  const messageContainerStyle = isUserMessage ? "bg-blue-500 text-white rounded-tl-lg" : "rounded-tr-lg border-2"
  const messageTimeStyle = isUserMessage ? "mr-2 text-right" : "ml-2"

  const parsedMessageTime = format(messageTime, 'h:mm a');

  return (
    <div>
      <p className={`text-xs ${messageTimeStyle}`}>{parsedMessageTime}</p>
      <div className={`${messageContainerStyle} p-2 rounded-bl-lg rounded-br-lg`}>
        <p className="text-sm">{faker.lorem.text()}</p>
      </div>
    </div>
  )
}