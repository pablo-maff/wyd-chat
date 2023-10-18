import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GoMention } from 'react-icons/go';
import { BsFillPencilFill } from 'react-icons/bs';
import { SettingsForm } from './SettingsForm';
import defaultAvatar from '../../assets/default-avatar/default_avatar.png'

export function Settings({ user, handleShowSettings }) {
  const [showEditUserForm, setShowEditUserForm] = useState(false)

  function handleShowEditUserForm() {
    setShowEditUserForm(!showEditUserForm)
  }

  return (
    <div className='bg-white pb-4 flex flex-col'>
      <div className='flex items-center pt-2'>
        <button
          className='ml-8 md:ml-4 z-10'
          onClick={!showEditUserForm ? handleShowSettings : handleShowEditUserForm}
          id='back-to-chatlist'
          aria-label='go back to chats list'
        >
          <AiOutlineArrowLeft size='1.5rem' />
        </button>
        <h3 className='text-xl font-bold ml-8'>
          Settings
        </h3>
        {!showEditUserForm &&
          <button
            className='ml-auto mr-8 md:mr-4 z-10'
            onClick={handleShowEditUserForm}
            id='edit-profile-button'
            aria-label='edit profile'
          >
            <BsFillPencilFill size='1.2rem' color='gray' />
          </button>
        }
      </div>
      <div className='flex justify-center'>
        <div className='w-full md:w-full'>
          {!showEditUserForm ?
            <>
              <div className='p-4 mt-4 w-full'>
                <div className='w-40 h-40 m-auto'>
                  <img
                    src={user.avatarPhoto?.tempURL || defaultAvatar}
                    className='rounded-full w-40 h-40'
                    alt="avatar image" />
                </div>
                <p className='text-lg font-semibold text-center mt-4'>{user.firstName} {user.lastName}</p>
              </div>
              <div className='flex items-center justify-center'>
                <GoMention size='1.5rem' color='gray' />
                <div className='ml-8'>
                  <p>{user.username}</p>
                  <p className='font-light text-sm'>Username</p>
                </div>
              </div>
            </>
            :
            <SettingsForm user={user} handleShowEditUserForm={handleShowEditUserForm} />
          }
        </div>
      </div>
    </div>
  )
}