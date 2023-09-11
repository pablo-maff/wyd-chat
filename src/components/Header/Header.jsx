import { faker } from '@faker-js/faker';
import { Contact } from '../Contact';

export function Header() {
  return (
    <header className="bg-white p-4">
      <div className="flex flex-row">
        <div className="w-1/3 pr-4 flex justify-between items-center">
          <h1 className="text-2xl text-green-800 min-w-max font-semibold">wyd-chat</h1>
          <h6>Settings</h6>
        </div>
        <div className="w-2/3 flex justify-between items-center">
          <Contact name={faker.person.fullName()} typing={true} />
          <div>
            Icons
          </div>
        </div>
      </div>
    </header>
  )
}
