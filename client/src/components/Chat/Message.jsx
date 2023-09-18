import clsx from "clsx";
import { format } from "date-fns";

export function Message({ message }) {
  const isUserMessage = message?.user.id === "user"

  const parsedMessageTime = format(message?.timestamp, 'h:mm a');

  return (
    <li className={clsx("max-w-[45%] py-2", isUserMessage ? "self-end" : "self-start")}>
      <p className={clsx("text-xs", isUserMessage ? "mr-2 text-right" : "ml-2")}>{parsedMessageTime}</p>
      <div className={clsx(isUserMessage ? "bg-blueChat-300 text-white rounded-tl-lg" : "rounded-tr-lg bg-white", "p-2   rounded-bl-lg rounded-br-lg")}>
        <p className="text-sm">{message?.message}</p>
      </div>
    </li>
  )
}