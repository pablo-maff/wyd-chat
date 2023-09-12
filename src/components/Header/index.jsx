import { faker } from '@faker-js/faker';
import { Contact } from '../Contact';
import { BsCameraVideo, BsTelephone, BsInfoCircle } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import logo from "~/assets/wyd-logos-blue/logo-tab.png"
import { Button } from '../Button';
import { Icon } from '../Icon';

export function Header() {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="flex flex-row">
        <div className="w-1/3 pr-4 flex justify-between items-center">
          <img src={logo} className="w-24 h-24" />
          <Button text={<Icon IconComponent={CiSettings} />} />
        </div>
        <div className="w-2/3 flex justify-between items-center">
          <Contact name={faker.person.fullName()} typing={true} />
          <div className="w-32 mr-8 flex justify-between">
            <Button text={<Icon IconComponent={BsCameraVideo} />} />
            <Button text={<Icon IconComponent={BsTelephone} />} />
            <Button text={<Icon IconComponent={BsInfoCircle} />} />
          </div>
        </div>
      </div>
    </header>
  )
}
