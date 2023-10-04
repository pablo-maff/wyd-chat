import { useField } from '../../hooks/useField'
import ChatInstance from '../../services/ChatInstance'

export function SettingsForm({ user }) {
  const firstName = useField('text', user.firstName)
  const lastName = useField('text', user.lastName)

  function handleSubmit(event) {
    event.preventDefault()

    const updatedUser = {
      firstName: firstName.inputs.value,
      lastName: lastName.inputs.value
    }
    ChatInstance.put(`/users/${user.id}`, updatedUser)
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className='p-4 mt-4 w-full'>
        <img
          src={user.avatarPhoto}
          className='rounded-full min-w-14 min-h-14 m-auto'
          alt="avatar image"
        />
        <div className="mb-2 mt-4">
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            minLength={2}
            {...firstName.inputs}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="familiy-name"
            required
            minLength={2}
            {...lastName.inputs}
          />
        </div>
      </div>
      <button type='submit' >Save</button>
    </form>
  )
}