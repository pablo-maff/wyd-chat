import { ImageMessage } from './ImageMessage'

export function MessageFile({ message }) {
  if (!message?.file) return null

  const messageContainsImage = message.file.toLowerCase().match(/.(jpeg|jpg|gif|png)/)

  return (
    <>
      {message.file && messageContainsImage ? (
        <ImageMessage message={message} />
      ) : (
        // Display a link if the message contains a non-image file
        <a
          href={message.file}
          target="_blank"
          rel="noreferrer"
          className="text-sm break-words pt-[6px] pr-[.5rem] pb-[.376rem] pl-[.625rem] underline"
        >
          {message.file}
        </a>
      )}
    </>
  )
}