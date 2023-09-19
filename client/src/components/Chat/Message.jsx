import clsx from "clsx";
import { format, parseISO } from 'date-fns';

export function Message({ message }) {
  // TODO: Change hardcoded user id to work dynamically after implementing proper user details storage
  const isUserMessage = message?.from === '6505d15550461292ea9630b5'

  const parsedMessageTime = format(parseISO(message?.timestamp), 'h:mm a')

  return (
    <li className={clsx("max-w-[45%] py-2", isUserMessage ? "self-end" : "self-start")}>
      <p className={clsx("text-xs", isUserMessage ? "mr-2 text-right" : "ml-2")}>{parsedMessageTime}</p>
      <div className={clsx(isUserMessage ? "bg-blueChat-300 text-white rounded-tl-lg" : "rounded-tr-lg bg-white", "p-2   rounded-bl-lg rounded-br-lg")}>
        <p className="text-sm">{message?.text}</p>
      </div>
    </li>
  )
}