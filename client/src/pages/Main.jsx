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
  const { user } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, loading, error } = useSelector((state) => state.userChats)

  useEffect(() => {
    // * If there is an id in the url and no chat is active is very likely that a manual refresh on the page just happened
    if (id && data?.chatRooms && !data?.activeChat?.id && !error) {
      dispatch(activateChat(id))
      return
    }
  }, [id, data, dispatch, error])

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
      navigate('/')
    }, 1000);


    return (
      <div className='h-full w-full flex flex-col items-center mt-10'>
        <h1 className='text-2xl'>Redirecting</h1>
        <h3 className='text-lg'>{error.message}</h3>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={data?.chatRooms} users={users} activeChatId={data?.activeChat?.id} />
      {data?.activeChat?.id ?
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
