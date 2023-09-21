import { Sidebar } from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router';
import { Header } from '../components/Header/Header';
import ChatInstance from '../services/ChatInstance';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux'
import { activateChat, resetStateAction } from '../redux/reducers/userChatsReducer';

function Main() {
  const [users, setUsers] = useState(undefined)

  const { id } = useParams()
  const { user, logoutUser } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, loading, error } = useSelector((state) => state.userChats)

  const activeChatId = data?.activeChat?.id

  useEffect(() => {
    // * Navigate to the correct url when activating a chat
    const navigationToChatRoomRequired = activeChatId && activeChatId !== id && !error

    if (navigationToChatRoomRequired) {
      navigate(`/chat/${activeChatId}`)
    }
  }, [activeChatId, id, navigate, error])

  useEffect(() => {
    // * If there is an id in the url and no chat is active is very likely that a manual refresh on the page just happened
    const activeChatDataMissing = id && data?.chatRooms && !activeChatId && !error

    if (activeChatDataMissing) {
      dispatch(activateChat(id))
    }
  }, [id, data, dispatch, error, activeChatId])

  // TODO: Create contacts reducer and move it there
  useEffect(() => {
    if (!users) {
      ChatInstance.get('/users')
        .then(response => {
          setUsers(response.data.filter(responseUser => responseUser.id !== user.id))
        })
    }
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
      dispatch(resetStateAction())

      if (error.message.toLowerCase().includes('missing authorization token')) {
        return logoutUser()
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
