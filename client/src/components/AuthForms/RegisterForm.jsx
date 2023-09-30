import UsersService from '../../services/usersService';
import { useField } from '../../hooks/useField';
import { useDispatch } from 'react-redux';
import { toast } from '../../redux/reducers/notificationsReducer';

const RegisterForm = ({ handleToggleForm }) => {
  const username = useField('email')
  const firstName = useField('text')
  const lastName = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: firstName.inputs.value,
      lastName: lastName.inputs.value,
      username: username.inputs.value,
      password: password.inputs.value,
    }

    UsersService.register(newUser)
      .then(_ => {
        dispatch(toast('We sent you an e-mail to verify that is you. Please click on the verification link and proceed to login', 'success', 10))
        handleToggleForm(e)
      })
      .catch(error => {
        console.error(error)
        dispatch(toast(`${error.response?.data?.error}`, 'error', 10))
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="mb-2">
          <label htmlFor="firstName" className="block mb-2 text-sm text-white font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            minLength={2}
            {...firstName.inputs}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block mb-2 text-sm text-white font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            minLength={2}
            {...lastName.inputs}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm text-white font-medium">
            Email
          </label>
          <input
            id="email"
            name="username"
            required
            {...username.inputs}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm text-white font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            required
            minLength={8}
            {...password.inputs}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Register
        </button>
      </form>
      <button
        onClick={handleToggleForm}
        className="w-full mt-2 bg-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Back to Login
      </button>
    </>
  );
};

export default RegisterForm;
