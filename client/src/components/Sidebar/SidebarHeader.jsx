import { CiSettings } from 'react-icons/ci';
import logo from '../../assets/wyd-logos-blue/logo-tab.png';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userAuthenticationReducer';

export function SidebarHeader() {
  const { user } = useSelector(state => state.userAuthentication)

  const dispatch = useDispatch()

  return (
    <div className='p-4 shadow-md w-full'>
      <div className='flex justify-between items-center'>
        <div className='mx-4'>
          <img src={logo} className='w-16 h-16' />
        </div>
        <div className='mx-4'>
          <Button
            text={<Icon IconComponent={CiSettings} />}
            onClick={() => dispatch(logoutUser(user))}
          />
        </div>
      </div>
    </div>
  );
}
