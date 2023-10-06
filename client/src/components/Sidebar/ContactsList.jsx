import { Contact } from '../Contact';
import { NoSearchResults } from '../NoSearchResults';

export function ContactsList({ filteredUsersData, handleCreateChatRoom }) {
  return (
    <>
      {filteredUsersData.length > 0 ?
        <>
          {filteredUsersData.map((user) => (
            <li
              key={user.id}
              id='contact-list-item'
              onClick={() => handleCreateChatRoom(user.id)}
              className='hover:cursor-pointer hover:bg-blueChat-50 hover:rounded-lg bg-white'
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
        :
        <NoSearchResults />
      }
    </>
  )
}
