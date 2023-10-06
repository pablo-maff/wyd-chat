import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import Linkify from 'linkify-react';
import { useSelector } from 'react-redux';

export function Message({ message }) {
  const { user } = useSelector(state => state.userAuthentication)

  const isUserMessage = message?.from === user.id

  const parsedMessageTime = format(parseISO(message?.timestamp), 'h:mm a')

  const options = {
    className: 'underline',
    target: '_blank',
    rel: 'noreferrer',
    defaultProtocol: 'https',
    truncate: 100
  };

  return (
    <li className={clsx('max-w-[45%] py-2', isUserMessage ? 'self-end' : 'self-start')}>
      <p className={clsx('text-xs', isUserMessage ? 'mr-2 text-right' : 'ml-2')}>{parsedMessageTime}</p>
      <div className={clsx(isUserMessage ? 'bg-blueChat-300 text-white rounded-tl-lg' : 'rounded-tr-lg bg-white', 'rounded-bl-lg rounded-br-lg')}>
        <Linkify
          as="p"
          options={options}
          className='text-sm break-words pt-[6px] pr-[.5rem] pb-[.376rem] pl-[.625rem]'
        >
          {message?.text}
        </Linkify>
      </div>
    </li>
  )
}