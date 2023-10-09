import { useRef } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export function MessageFile({ message }) {
  const downloadButtonRef = useRef(null)
  const downloadFileRef = useRef(null)

  if (!message?.file) return null

  const messageContainsImage = message.file.toLowerCase().match(/.(jpeg|jpg|gif|png)/)

  function handleDownloadFile() {
    downloadFileRef.current.click()
  }

  return (
    <>
      {message.file && messageContainsImage ? (
        // * Display image if the message contains an image file
        <div
          className="relative flex p-2 bg-blueChat-300 rounded-lg shadow-lg cursor-pointer"
          onClick={handleDownloadFile}
          onMouseEnter={() => {
            // * Show the "Download" button when hovering
            downloadButtonRef.current.classList.remove('hidden');
          }}
          onMouseLeave={() => {
            // * Hide the "Download" button when no longer hovering
            downloadButtonRef.current.classList.add('hidden');
          }}
        >
          <img
            src={message.file}
            alt="Uploaded Image"
          />
          <a href={message.file} className='hidden' ref={downloadFileRef} download />
          <button
            className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 transition-colors hover:text-blueChat-300"
            ref={downloadButtonRef}
          >
            <AiOutlineCloudDownload size='2rem' />
          </button>
        </div>
      ) : message.file ? (
        // Display a link if the message contains a non-image file
        <a
          href={message.file}
          target="_blank"
          rel="noreferrer"
          className="text-sm break-words pt-[6px] pr-[.5rem] pb-[.376rem] pl-[.625rem] underline"
        >
          {message.file}
        </a>
      ) : null}
    </>
  )
}