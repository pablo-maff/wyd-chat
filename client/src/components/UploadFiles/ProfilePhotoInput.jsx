import { useRef, useState } from 'react'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import defaultAvatar from '../../assets/default-avatar/default_avatar.png'

export function ProfilePhotoInput() {
  const [file, setFile] = useState(defaultAvatar);
  const [photoPreview, setPhotoPreview] = useState(defaultAvatar);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className="text-center relative">
        {/* Current Profile Photo */}
        <div className='mt-2'>
          <img
            src={photoPreview}
            className="w-40 h-40 m-auto rounded-full shadow"
            alt="Current Profile"
          />
        </div>
        <div
          onClick={clickHandler}
          className='bg-transparent absolute top-0 w-full cursor-pointer'
        >
          <span
            className="w-40 h-40 m-auto flex items-center justify-center"
          >
            <MdOutlineAddAPhoto
              color='white'
              size='2rem'
            />
          </span>
        </div>
      </div>
    </div>
  );
}