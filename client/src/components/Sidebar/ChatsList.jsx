import { useDispatch, useSelector } from 'react-redux';
import { activateChat } from '../../redux/reducers/userChatsReducer';
import { Contact } from '../Contact';
import { useSidebarContext } from '../../hooks/useSidebarContext';

export function ChatsList() {
  const dispatch = useDispatch()
  const { toggleSidebar } = useSidebarContext()

  const { data: chatsData } = useSelector(state => state.userChats)
  const { user } = useSelector(state => state.userAuthentication)
  const { typingUsersById, onlineUsersById } = useSelector(state => state.userContacts)

  const activeChatId = chatsData?.activeChat?.id

  function handleSelectChat(chatId) {
    dispatch(activateChat(chatId))
    toggleSidebar(false)
  }

  return (
    <>
      {chatsData.chatRooms.map((chat) => {
        const lastContactMessage = chat?.messages
          ?.filter(message => message.from !== user.id)
          .at(-1)

        return (
          <li
            key={chat.id}
            onClick={() => handleSelectChat(chat.id)}
            id='chat-list-item'
            className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg mx-1 bg-white'
          >
            <Contact
              key={chat?.contact?.id}
              name={chat?.title}
              avatar={chat?.contact?.avatarPhoto}
              showLastMessage={lastContactMessage}
              typing={typingUsersById.includes(chat?.contact?.id)}
              selectedChat={chat.id === activeChatId ? true : false}
              isOnline={onlineUsersById.includes(chat?.contact?.id)}
            />
          </li>
        );
      })}
    </>
  )
}
