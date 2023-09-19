import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router';

export function ChatInput({ submitNewMessage }) {
  const { id } = useParams()

  const [newMessage, setNewMessage] = useState("")
  const textareaRef = useRef(null)


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
      setNewMessage("")
    }
  }, [id])

  function handleSubmitNewMessage(event) {
    event.preventDefault()
    submitNewMessage(newMessage)
    setNewMessage("")
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmitNewMessage(event)
    }
  }

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