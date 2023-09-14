import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

export function ChatInput({ chatMessages }) {
  const [newMessage, setNewMessage] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    // ! When connected to websockets this will focus the input every time a message is received
    if (!!textareaRef.current) {
      textareaRef.current.focus()
      setNewMessage("")
    }
  }, [chatMessages])

  function handleSubmitNewMessage(event) {
    event.preventDefault()
    setNewMessage("")
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmitNewMessage(event)
    }
  };

  return (
    <form onSubmit={handleSubmitNewMessage} className="flex pt-1 pb-4 px-6">
      <TextareaAutosize
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        maxRows={15}
        ref={textareaRef}
        onKeyDown={handleKeyDown} // Listen for Enter key press
        className='p-2 rounded-lg resize-none w-full focus:outline-none shadow-lg hover:shadow-xl'
        placeholder="Message"
      />
      <button type='submit' className='hidden' />
    </form>
  )
}