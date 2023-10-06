import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Contact } from '../Contact'

// filter component
const Filter = ({filtered, setFiltered}) => {
  return(
    <div className='filter-name'>
      <p>Filter by name:</p>
      <input 
      type="text"
      value={filtered}
      onChange={(e) => setFiltered(e.target.value)}
      placeholder='Search...'
      />
    </div>
  )
}

// this component displays saved persons
const Persons = ({persons, filtered, removePerson}) => {
  const filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(filtered.toLowerCase()));
  return (
    <ul style={{ listStyleType: 'none' }}>
      {filteredPersons.map(e => 
      <li className='person-list' key={e.id}>
        <div className="person-info">
          <span>
            {e.name}  {e.number}
          </span> 
          <button onClick={() => removePerson(e.id)}>Delete</button>
        </div> <hr />
      </li>
      )}
    </ul>
  )
}

export function ContactsList({ handleCreateChatRoom }) {
  const { data: usersData } = useSelector(state => state.userContacts)
  const [filtered, setFiltered] = useState('')

  return (
    <>
      <Filter filtered={filtered} setFiltered={setFiltered} />
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