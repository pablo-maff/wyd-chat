import defaultAvatar from '../../assets/default-avatar/default_avatar.png'

export function Avatar({ avatar, typing, isOnline }) {
  const isTyping = typing ? 'border-2 border-blueChat-300' : ''

  return (
    <div className="w-16 h-16">
      <img
        src={avatar ? avatar : defaultAvatar}
        className={`rounded-full min-w-16 min-h-16 ${isTyping}`}
        alt="avatar image"
      />
      {isOnline && <div>Online</div>}
    </div>)
}