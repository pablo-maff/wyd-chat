import { Sidebar } from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header/Header';
import ChatInstance from '../services/ChatInstance';
import { useDispatch, useSelector } from 'react-redux'
import { resetUserChatsState } from '../redux/reducers/userChatsReducer';
import { logoutUser } from '../redux/reducers/userAuthenticationReducer';

function Main() {
  const [users, setUsers] = useState(undefined)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, loading, error } = useSelector((state) => state.userChats)
  const { user, isAuthenticated } = useSelector(state => state.userAuthentication)

  const activeChatId = data?.activeChat?.id

  useEffect(() => {
    // * Navigate to the correct url when activating a chat
    const navigationToChatRoomRequired = activeChatId && activeChatId !== id && !error

    if (navigationToChatRoomRequired) {
      navigate(`/chat/${activeChatId}`)
    }
  }, [activeChatId, id, navigate, error])

  // TODO: Create contacts reducer and move it there
  useEffect(() => {
    if (!users) {
      ChatInstance.get('/users')
        .then(response => {
          setUsers(response.data.filter(responseUser => responseUser.id !== user.id))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    // TODO: Loading component
    return (
      <div className='h-full w-full flex justify-center mt-10'>
        Loading...
      </div>
    )
  }

  if (error) {
    // TODO: Keep rendering the page and show error notification if possible
    setTimeout(() => {
      dispatch(resetUserChatsState())

      if (error.message.toLowerCase().includes('missing authorization token')) {
        return dispatch(logoutUser())
      }

      navigate('/')
    }, 1500);


    return (
      <div className='h-full w-full flex flex-col items-center mt-10'>
        <h1 className='text-2xl'>Redirecting</h1>
        <h3 className='text-lg'>{error.message}</h3>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={data?.chatRooms} users={users} activeChatId={activeChatId} />
      {activeChatId ?
        <div className='flex flex-1 flex-col'>
          <Header activeChat={data.activeChat} />
          <Outlet />
        </div>
        :
        <div className='w-2/3 bg-blueChat-50' />
      }
    </div>
  );
}

export default Main;
