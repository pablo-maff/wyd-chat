import { useRef } from 'react'
import { AiFillFile } from 'react-icons/ai'

export function OtherFilesMessage({ message }) {
  const downloadFileRef = useRef(null)

  function handleDownloadFile() {
    downloadFileRef.current.click()
  }

  return (
    <div className='flex items-center cursor-pointer' onClick={handleDownloadFile} >
      <div className="p-1 pl-2">
        <AiFillFile size='2.5rem' />
      </div>
      <div className='overflow-hidden pt-[6px] pr-[.5rem] pb-[.376rem] pl-[.625rem]'>
        <div className='line-clamp-2'>
          <a
            href={message.tempURL}
            ref={downloadFileRef}
            className="font-bold"
            download
          >
            {message.file.name}
          </a>
        </div>
        {/* // TODO: Get metadata about files and show the file size and a cleaner file name */}
        {/* <div className='text-gray-300'>2MB</div> */}
      </div>
    </div>
  )
}