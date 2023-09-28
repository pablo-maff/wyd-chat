import { useSelector } from 'react-redux';
import { AiFillInfoCircle, AiFillCheckCircle, AiFillWarning, AiOutlineClose } from 'react-icons/ai'
import { BiSolidErrorCircle } from 'react-icons/bi'

export function Toast() {
  // const { notification } = useSelector(state => state)

  // if (!notification.message || !notification.type) return null

  // const { message, type } = notification
  const message = 'info message'
  const type = 'error'
  const iconClassName = 'mr-2 fill-current'
  const iconSize = '1.5em'

  let toastIcon;
  let toastColor

  switch (type) {
    case 'info':
      toastIcon = <AiFillInfoCircle size={iconSize} className={iconClassName} />
      toastColor = 'bg-blueChat-200'
      break
    case 'success':
      toastIcon = <AiFillCheckCircle size={iconSize} className={iconClassName} />
      toastColor = 'bg-green-500'
      break
    case 'warning':
      toastIcon = <AiFillWarning size={iconSize} className={iconClassName} />
      toastColor = 'bg-yellow-400'
      break
    case 'error':
      toastIcon = <BiSolidErrorCircle size={iconSize} className={iconClassName} />
      toastColor = 'bg-red-400'
      break
    default:
      break
  }

  if (!toastIcon) return null

  return (
    <>
      <div
        className={`${toastColor} fixed top-4 right-4 pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-primary-100 bg-clip-padding text-sm text-primary-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden`}
        id="static-example"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-te-autohide="false"
        data-te-toast-init
        data-te-toast-show
      >
        <div
          className="flex items-center justify-between rounded-t-lg border-b-2 border-primary-200 bg-primary-100 bg-clip-padding px-4 pb-2 pt-2.5 text-primary-700">
          <p className="flex items-center uppercase font-bold text-primary-700">
            {toastIcon}
            {type}
          </p>
          <div className="flex items-center">
            <button
              type="button"
              className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-toast-dismiss
              aria-label="Close">
              <span
                className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                <AiOutlineClose size='1.5em' className='m-1' />
              </span>
            </button>
          </div>
        </div>
        <div className="rounded-b-lg bg-primary-100 px-4 py-4 text-primary-700">
          <p className="line-clamp-5 first-letter:capitalize">
            {message}
          </p>
        </div>
      </div>
    </>
  )
}
