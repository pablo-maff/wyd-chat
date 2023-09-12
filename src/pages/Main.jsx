import Chat from '../components/Chat/Chat';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';

function Main() {
  return (
    <div className='w-full h-full flex flex-nowrap'>
      <Sidebar />
      <div className='flex flex-1 flex-col'>
        <Header />
        <Chat />
      </div>
    </div>
  );
}

export default Main;
