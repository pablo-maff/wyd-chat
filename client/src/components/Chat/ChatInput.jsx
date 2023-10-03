import { useEffect, useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router';
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux';
import { sendThisUserIsTyping, sendThisUserStoppedTyping } from '../../redux/reducers/userContactsReducer';

export function ChatInput({ submitNewMessage }) {
  const { id } = useParams()
  const { user } = useSelector(state => state.userAuthentication)
  const activeChat = useSelector((state) => state.userChats).data.activeChat

  const [newMessage, setNewMessage] = useState('')
  const textareaRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
      setNewMessage('')

      return (() => dispatch(sendThisUserStoppedTyping({
        from: user.id,
        to: activeChat.contact.id
      }))
      )
    }
    // * We want stale closure of activeChat here to send the stop typing signal to the correct user (the one of the previously selected chat\)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // * Debounce the typing indication emit
  // * useMemo instead of useCallback because of EsLint error (see https://github.com/facebook/react/issues/19240)
  const debouncedTypingIndicationEmit = useMemo(() =>
    debounce(() => dispatch(sendThisUserIsTyping({
      from: user.id,
      to: activeChat.contact.id
    })), 500)
    , [activeChat.contact.id, dispatch, user.id])

  const handleChangeNewMessage = (event) => {
    if (event.target.value !== '') {
      debouncedTypingIndicationEmit()
    }
    else if (event.target.value === '') {
      // * Delay the stopped typing emit to compensate for the debounce
      setTimeout(() => {
        dispatch(sendThisUserStoppedTyping({
          from: user.id,
          to: activeChat.contact.id
        }))
      }, 500)
    }

    setNewMessage(event.target.value)
  }

  function handleSubmitNewMessage(event) {
    event.preventDefault()

    if (newMessage && newMessage.trim() !== '') {
      submitNewMessage(newMessage)
      setNewMessage('')

      // * Delay the stopped typing emit to compensate for the debounce
      setTimeout(() => {
        dispatch(sendThisUserStoppedTyping({
          from: user.id,
          to: activeChat.contact.id
        }))
      }, 500)
    }
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
        onChange={handleChangeNewMessage}
        maxRows={15}
        minLength={1}
        maxLength={4001}
        ref={textareaRef}
        onKeyDown={handleKeyDown} // Listen for Enter key press
        className='p-2 rounded-lg resize-none w-full focus:outline-none shadow-lg hover:shadow-xl'
        placeholder="Message"
      />
      <button type='submit' className='hidden' />
    </form>
  )
}