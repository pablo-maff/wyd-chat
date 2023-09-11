import { faker } from '@faker-js/faker';
import { Contact } from '../Contact';
import { BsCameraVideo, BsTelephone, BsInfoCircle } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'

export function Header() {
  return (
    <header className="bg-white p-4 border">
      <div className="flex flex-row">
        <div className="w-1/3 pr-4 flex justify-between items-center">
          <h1 className="text-2xl text-green-600 min-w-max font-semibold">wyd-chat</h1>
          <CiSettings size="24" className="text-green-600" />
        </div>
        <div className="w-2/3 flex justify-between items-center">
          <Contact name={faker.person.fullName()} typing={true} />
          <div className="w-32 mr-8 flex justify-between">
            <BsCameraVideo size="24" className="text-green-600" />
            <BsTelephone size="24" className="text-green-600" />
            <BsInfoCircle size="24" className="text-green-600" />
          </div>
        </div>
      </div>
    </header>
  )
}
