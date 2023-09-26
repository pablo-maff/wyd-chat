// import { addMessage } from '../store/messages.slice'
// import { addUser, removeTypingUser, setOnlineUsersByUsername, setTypingUser } from '../store/users.slice'

import { appendChatRoomMessage } from '../reducers/userChatsReducer';
import { addUser } from '../reducers/userContactsReducer';

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params
    const { type, payload } = action

    console.log('type', type);
    console.log('payload', payload);

    switch (type) {
      // * Connect to the socket when a user logs in
      case 'userAuthentication/login': {
        socket.connect()
        socket.emit('login', payload)


        // * Set up all the socket event handlers
        // * When these events are received from the socket, they'll dispatch the proper Redux action

        // TODO: Update the online users list every time a user logs in or out
        socket.on('users online', (onlineUsers) => {
          // dispatch(setOnlineUsersByUsername(onlineUsers))
        })

        // * Append a message every time a new one comes in
        socket.on('receive_message', (message) => {
          dispatch(appendChatRoomMessage({ message }))
        })

        // TODO: Remove if some user stops typing
        socket.on('user stopped typing...', (username) => {
          // dispatch(removeTypingUser(username));
        })

        // TODO: Add if some user starts typing
        socket.on('user starts typing...', (username) => {
          // dispatch(setTypingUser(username));
        })

        // TODO: Append a user every time a new one is registered
        socket.on('new user added', (user) => {
          dispatch(addUser(user))
        })

        // TODO: Add the current user to the online users list
        socket.emit('new login', payload)

        break
      }

      // TODO: Telling the sever that this user is typing...
      case 'users/sendThisUserIsTyping': {
        socket.emit('typing...', payload)

        break
      }

      // TODO: Telling the server that this user stopped typing..
      case 'users/sendThisUserStoppedTyping': {
        socket.emit('stopped typing...', payload)

        return
      }

      // * Let the server be the source of truth for all messages; don't dispatch anything
      // case 'userChats/sendMessage': {
      //   socket.emit('send_message', payload)

      //   return
      // }

      // * Disconnect from the socket when a user logs out
      case 'userAuthentication/logout': {
        socket.emit('end', payload)
        socket.disconnect()
        break
      }
    }

    return next(action)
  }
}