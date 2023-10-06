import { useSelector } from 'react-redux';
import { Contact } from '../Contact';
import { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';

export function ContactsList({ handleCreateChatRoom }) {
  const { data: usersData } = useSelector(state => state.userContacts);

  const { filteredData, searchInput } = useSearch(usersData, 'fullName', 'full name')

  return (
    <>
      <div className='bg-white'>
        {searchInput}
      </div>
      {filteredData.map((user) => (
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
  );
}
