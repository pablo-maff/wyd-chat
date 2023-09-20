import { faker } from '@faker-js/faker';
import { BsCameraVideo, BsInfoCircle, BsTelephone } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import logo from '~/assets/wyd-logos-blue/logo-tab.png';
import { Button } from '../Button';
import { Contact } from '../Contact';
import { Icon } from '../Icon';
import { useSelector } from 'react-redux';

export function Header({ activeChat }) {
  return (
    <header className='bg-white p-4 shadow-md'>
      <div className='flex flex-row'>
        <div className='w-1/3 pr-4 flex justify-between items-center'>
          <img src={logo} className='w-24 h-24' />
          <Button text={<Icon IconComponent={CiSettings} />} />
        </div>
        <div className='w-2/3 flex justify-between items-center'>
          <Contact
            name={activeChat?.title}
            avatar={activeChat?.contact?.avatarPhoto}
            typing={false}
            showLastSeen={activeChat.contact.lastTimeOnline}
          />
          <div className='w-32 mr-8 flex justify-between'>
            <Button text={<Icon IconComponent={BsCameraVideo} />} />
            <Button text={<Icon IconComponent={BsTelephone} />} />
            <Button text={<Icon IconComponent={BsInfoCircle} />} />
          </div>
        </div>
      </div>
    </header>
  );
}
