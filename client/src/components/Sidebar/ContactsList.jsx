import { useSelector } from 'react-redux';
import { Contact } from '../Contact';
import { useState } from 'react'; // Import useState

export function ContactsList({ handleCreateChatRoom }) {
  const { data: usersData } = useSelector(state => state.userContacts);

  // add a state variable for the filter
  const [filterText, setFilterText] = useState('');

  // filtering function
  const filteredUsers = usersData.filter((user) => {
    const fullName = `${user?.firstName} ${user?.lastName}`.toLowerCase();
    return fullName.includes(filterText.toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className='bg-gray-200 m-3 px-3 h-7 rounded-md'
      />
      
      {filteredUsers.map((user) => (
        <>
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
          </li> <hr /> 
        </>
      ))}
    </>
  );
}
