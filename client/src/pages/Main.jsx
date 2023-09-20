import { Sidebar } from '../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Header } from '../components/Header/Header';
import ChatInstance from '../services/ChatInstance';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux'
import { activateChat } from '../redux/reducers/userChatsReducer';
import Chat from '../components/Chat';

function Main() {
  const [users, setUsers] = useState(undefined)

  const { id } = useParams()
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { data, loading, error } = useSelector((state) => state.userChats)

  useEffect(() => {
    // * If there is an id in the url and no chat is active is very likely that a manual refresh on the page just happened
    if (id && data && !data?.activeChat?.id) {
      dispatch(activateChat(id))
    }
  }, [id, data, dispatch])

  useEffect(() => {
    if (!users) {
      console.log("FETCH USERS");
      ChatInstance.get('/users')
        .then(response => {
          setUsers(response.data.filter(responseUser => responseUser.id !== user.id))
        })
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    // TODO: Show error notification if possible
    console.log('In react!');
    return <div>{error.message}</div>
  }

  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar chats={data.chatRooms} users={users} activeChatId={data.activeChat?.id} />
      {data.activeChat?.id ?
        <div className='flex flex-1 flex-col'>
          <Header activeChat={data.activeChat} />
          <Chat />
        </div>
        :
        <div className='w-2/3 bg-blueChat-50' />
      }
    </div>
  );
}

export default Main;
