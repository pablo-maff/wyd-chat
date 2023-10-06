import { useRef, useState } from 'react'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import defaultAvatar from '../assets/default-avatar/default_avatar.png'
import { useDispatch } from 'react-redux';
import { toast } from '../redux/reducers/notificationsReducer';

export function useProfilePhotoInput(avatarPhoto) {
  console.log('avatarPhoto', avatarPhoto);
  const [photoPreview, setPhotoPreview] = useState(avatarPhoto ? avatarPhoto : defaultAvatar);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch()

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file.size > 100000) {
      dispatch(toast('File size can\'t be bigger than 10kb', 'error'))
      return
    }

    const previewReader = new FileReader();
    previewReader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    previewReader.readAsDataURL(file);

  }

  const clickHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const photoInputComponent = (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className="text-center relative">
        <div className='mt-2'>
          <img
            src={photoPreview}
            className="min-w-40 min-h-40 w-40 h-40 m-auto rounded-full"
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
  )

  return {
    photoPreview,
    photoInputComponent
  }
}