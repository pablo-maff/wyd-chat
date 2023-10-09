import { useRef } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export function ImageMessage({ message }) {
  const downloadButtonRef = useRef(null)
  const downloadFileRef = useRef(null)



  function handleDownloadFile() {
    downloadFileRef.current.click()
  }

  return (
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
  )
}