import { faker } from '@faker-js/faker';

export function Avatar({ typing }) {
  const isTyping = typing ? "border-2 border-green-400" : ""

  return (
    <div className="w-16 h-16">
      <img
        src={faker.internet.avatar()}
        className={`rounded-full min-w-16 min-h-16 ${isTyping}`}
        alt="avatar image"
      />
    </div>)
}