import { Sidebar } from '../components/Sidebar';
import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router';
import { ChatHeader } from '../components/Chat/ChatHeader';
import { useDispatch, useSelector } from 'react-redux'
import { resetUserChatsState } from '../redux/reducers/userChatsReducer';
import { logoutUser } from '../redux/reducers/userAuthenticationReducer';

function Main() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: chatRooms, loading: chatsLoading, error: chatsError } = useSelector(state => state.userChats)
  const { data: users, loading: usersLoading, error: usersError } = useSelector(state => state.userContacts)

  const activeChatId = chatRooms?.activeChat?.id

  useEffect(() => {
    // * Navigate to the correct url when activating a chat
    const navigationToChatRoomRequired = activeChatId && activeChatId !== id && !chatsError && !usersError

    if (navigationToChatRoomRequired) {
      navigate(`/chat/${activeChatId}`)
    }
  }, [activeChatId, id, navigate, chatsError, usersError])

  if (chatsLoading || usersLoading) {
    // TODO: Loading component
    return (
      <div className='h-full w-full flex justify-center mt-10'>
        Loading...
      </div>
    )
  }

  if (chatsError || usersError) {
    // TODO: Keep rendering the page and show chatsError or usersError notification if possible
    setTimeout(() => {
      dispatch(resetUserChatsState())

      const isMissingTokenError =
        chatsError.message.toLowerCase().includes('invalid token') ||
        usersError.message.toLowerCase().includes('invalid token') ||
        chatsError.message.toLowerCase().includes('token expired') ||
        usersError.message.toLowerCase().includes('token expired')

      if (isMissingTokenError) {
        return dispatch(logoutUser())
      }

      navigate('/')
    }, 1500);


    return (
      <div className='h-full w-full flex flex-col items-center mt-10'>
        <h1 className='text-2xl'>Redirecting</h1>
        <h3 className='text-lg'>{chatsError.message || usersError.message}</h3>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-nowrap bg-blur'>
      <Sidebar chats={chatRooms?.chatRooms} users={users} activeChatId={activeChatId} />
      {activeChatId ?
        <div className='flex flex-1 flex-col blur-overlay'>
          <ChatHeader activeChat={chatRooms.activeChat} />
          <Outlet />
        </div>
        :
        <div className='w-2/3 bg-blueChat-50' />
      }
    </div >
  );
}

export default Main;
