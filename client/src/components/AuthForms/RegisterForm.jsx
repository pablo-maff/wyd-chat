import UsersService from '../../services/usersService';
import { useField } from '../../hooks/useField';
import { useDispatch } from 'react-redux';
import { toast } from '../../redux/reducers/notificationsReducer';
import { useEffect } from 'react';
import { useProfilePhotoInput } from '../../hooks/useProfilePhotoInput';

const RegisterForm = ({ handleToggleForm }) => {
  const username = useField('email')
  const firstName = useField('text')
  const lastName = useField('text')
  const password = useField('password')
  const confirmPassword = useField('password')

  const { rawPhoto, photoInputComponent } = useProfilePhotoInput()

  const dispatch = useDispatch()

  useEffect(() => {
    if (password.inputs.value !== confirmPassword.inputs.value) {
      // * Set native html input validation error
      confirmPassword.inputs.ref.current.setCustomValidity('Passwords don\'t match');
      return
    }

    confirmPassword.inputs.ref.current.setCustomValidity('');

  }, [confirmPassword.inputs.ref, confirmPassword.inputs.value, password.inputs.value])

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: firstName.inputs.value,
      lastName: lastName.inputs.value,
      username: username.inputs.value,
      password: password.inputs.value,
      file: rawPhoto
    }

    UsersService.register(newUser)
      .then((_) => {
        dispatch(
          toast(
            'We sent you an e-mail to verify that it is you. Please click on the verification link and proceed to login',
            'success',
            10
          )
        );
        handleToggleForm(e);
      })
      .catch((error) => {
        console.error(error);
        dispatch(toast(`${error.response?.data?.error}`, 'error', 10));
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className="mb-2 mt-4">
          <label htmlFor="fileInput" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Profile picture</span>
            </strong>
          </label>
          {photoInputComponent}
        </div>
        <div className="mb-2">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Name</span>
              <span aria-label='required'>
                *
              </span>
            </strong>
          </label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            minLength={2}
            maxLength={30}
            {...firstName.inputs}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Surname</span>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="familiy-name"
            required
            minLength={2}
            maxLength={30}
            {...lastName.inputs}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Email</span>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input
            id="email"
            name="username"
            autoComplete="email"
            required
            {...username.inputs}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Password</span>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input
            id="password"
            name="password"
            required
            minLength={8}
            maxLength={12}
            placeholder='Between 8 and 12 characters'
            autoComplete="password"
            {...password.inputs}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Confirm Password</span>
              <span aria-label='required'>*</span>
            </strong>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength={8}
            maxLength={12}
            autoComplete="new-password"
            {...confirmPassword.inputs}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Register
        </button>
      </form >
      <button
        onClick={handleToggleForm}
        className="w-full mt-2 border border-gray-500 bg-white py-2 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-200"
      >
        Back to Login
      </button>
    </>
  );
};

export default RegisterForm;
