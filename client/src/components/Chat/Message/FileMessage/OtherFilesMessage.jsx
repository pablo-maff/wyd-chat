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
            href={message.file}
            ref={downloadFileRef}
            className="font-bold"
            download
          >
            {message.file}
          </a>
        </div>
        <div className='text-gray-300'>2MB</div>
      </div>
    </div>
  )
}