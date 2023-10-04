import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GoMention } from 'react-icons/go';
import { BsFillPencilFill } from 'react-icons/bs';
import { SettingsForm } from './SettingsForm';

export function Settings({ user, handleShowSettings }) {
  const [showEditUserForm, setShowEditUserForm] = useState(false)

  function handleShowEditUserForm() {
    setShowEditUserForm(!showEditUserForm)
  }

  return (
    <div className='bg-white pb-4'>
      <div className='flex w-full items-center pt-2'>
        <button className='ml-4 z-10' onClick={!showEditUserForm ? handleShowSettings : handleShowEditUserForm}>
          <AiOutlineArrowLeft size='1.5rem' />
        </button>
        <h3 className='text-xl font-bold ml-8'>
          Settings
        </h3>
        {!showEditUserForm &&
          <button className='ml-auto mr-4 z-10' onClick={handleShowEditUserForm}>
            <BsFillPencilFill size='1.2rem' color='gray' />
          </button>
        }
      </div>
      {!showEditUserForm ?
        <>
          <div className='p-4 mt-4 w-full'>
            <img
              src={user.avatarPhoto}
              className='rounded-full min-w-14 min-h-14 m-auto'
              alt="avatar image" />
            <h6 className='text-lg font-semibold text-center mt-4'>{user.firstName} {user.lastName}</h6>
          </div>
          <div className='flex items-center justify-evenly'>
            <GoMention size='1.5rem' color='gray' />
            <div>
              <p>{user.username}</p>
              <p className='font-light text-sm'>Username</p>
            </div>
          </div>
        </>
        :
        <SettingsForm user={user} />
      }
    </div>
  )
}