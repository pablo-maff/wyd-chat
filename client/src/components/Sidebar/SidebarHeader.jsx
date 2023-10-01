import { BsCameraVideo, BsInfoCircle, BsTelephone } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import logo from '../../assets/wyd-logos-blue/logo-tab.png';
import { Button } from '../Button';
import { Icon } from '../Icon';

export function SidebarHeader() {

  return (
    <div className='bg-white shadow-md p-4 w-full flex flex-row justify-between items-center'>
      <div className='mx-4'>
        <img src={logo} className='w-16 h-16' />
      </div>
      <div className='mx-4'>
        <Button text={<Icon IconComponent={CiSettings} />} />
      </div>
    </div>
  );
}
