import { BsCameraVideo, BsInfoCircle, BsTelephone } from 'react-icons/bs';
import { Button } from '../Button';
import { Contact } from '../Contact';
import { Icon } from '../Icon';
import { useSelector } from 'react-redux';

export function ChatHeader({ activeChat }) {
  const { typingUsersById, onlineUsersById } = useSelector(state => state.userContacts)

  return (
    <div className='bg-white p-4 shadow-md'>
      <div className='w-full flex flex-row justify-between items-center'>
        <Contact
          name={activeChat?.title}
          avatar={activeChat?.contact?.avatarPhoto}
          typing={typingUsersById.includes(activeChat?.contact?.id)}
          showLastTimeOnline={activeChat.contact?.lastTimeOnline}
          isOnline={onlineUsersById.includes(activeChat?.contact?.id)}
        />
        <div className='w-32 mx-4 flex justify-between'>
          <Button text={<Icon IconComponent={BsCameraVideo} />} />
          <Button text={<Icon IconComponent={BsTelephone} />} />
          <Button text={<Icon IconComponent={BsInfoCircle} />} />
        </div>
      </div>
    </div>
  );
}
