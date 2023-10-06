import { useSelector } from 'react-redux'
import { Contact } from '../Contact'

export function ContactsList({ handleCreateChatRoom }) {
  const { data: usersData } = useSelector(state => state.userContacts)

  return (
    <>
      {usersData.map((user) => (
        <li
          key={user.id}
          id='contact-list-item'
          onClick={() => handleCreateChatRoom(user.id)}
          className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg'
        >
          <Contact
            key={user.id}
            name={`${user?.firstName} ${user?.lastName}`}
            avatar={user?.avatarPhoto}
            showLastTimeOnline={user?.lastTimeOnline}
          />
        </li>
      ))}
    </>
  )
}