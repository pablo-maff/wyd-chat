import clsx from 'clsx';
import React, { useState } from 'react';

function Chat() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={clsx(
        'h-full lg:block bg-blue-200 p-8',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <div>Empty Chat</div>
    </div>
  );
}

export default Chat;
