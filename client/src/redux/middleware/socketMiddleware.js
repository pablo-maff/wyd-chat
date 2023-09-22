// import { addMessage } from '../store/messages.slice'
// import { addUser, removeTypingUser, setOnlineUsersByUsername, setTypingUser } from '../store/users.slice'

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
      // Connect to the socket when a user logs in
      // case 'users/login': {
      //   socket.connect()

      //   // Set up all the socket event handlers
      //   // When these events are received from the socket, they'll dispatch the proper Redux action

      //   // Update the online users list every time a user logs in or out
      //   socket.on('users online', (onlineUsers) => {
      //     dispatch(setOnlineUsersByUsername(onlineUsers))
      //   })

      //   // Append a message every time a new one comes in
      //   socket.on('receive message', (message) => {
      //     dispatch(addMessage(message))
      //   })

      //   // Remove if some user stops typing
      //   socket.on('user stopped typing...', (username) => {
      //     dispatch(removeTypingUser(username));
      //   })

      //   // Add if some user starts typing
      //   socket.on('user starts typing...', (username) => {
      //     dispatch(setTypingUser(username));
      //   })

      //   // Append a user every time a new one is registered
      //   socket.on('new user added', (user) => {
      //     dispatch(addUser(user))
      //   })

      //   // Add the current user to the online users list
      //   socket.emit('new login', payload)

      //   break
      // }

      // // Telling the sever that this user is typing...
      // case 'users/sendThisUserIsTyping': {
      //   socket.emit('typing...', payload)

      //   break
      // }

      // // Telling the server that this user stopped typing..
      // case 'users/sendThisUserStoppedTyping': {
      //   socket.emit('stopped typing...', payload)

      //   return
      // }

      // // Disconnect from the socket when a user logs out
      // case 'users/logout': {
      //   socket.disconnect()

      //   break
      // }
      // Let the server be the source of truth for all messages; don't dispatch anything
      case 'userChats/appendChatRoomMessage': {
        console.log('Sending message signal!')
        socket.emit('send message', payload)

        return
      }
    }

    return next(action)
  }
}