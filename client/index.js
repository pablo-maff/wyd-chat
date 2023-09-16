import { faker } from "@faker-js/faker"

let database = { chats: [], messages: [], users: [] };
const threshold = 20;

for (let i = 1; i <= threshold; i++) {
  const userFirstName = faker.person.firstName()
  const userLastName = faker.person.lastName()

  const newUser = {
    id: i,
    firstName: userFirstName,
    lastName: userLastName,
    fullName: `${userFirstName} ${userLastName}`,
    profileImage: faker.image.avatar()
  }

  database.users.push(newUser)

  if (database.users.length > 1) {
    const newChatId = i + 10000
    const newMessageId = i + 20000

    for (let j = 1; j < 20; j++) {
      const newMessage = {
        id: newMessageId,
        from: database.users[i - 1],
        to: newUser,
        text: faker.lorem.text(),
        timestamp: faker.date.anytime(),
        userId: database.users[i - 1].id,
        chatId: newChatId
      }

      database.messages.push(newMessage)
    }

    if (database.users.length > 2) {

      const newChat = {
        id: newChatId,
        users: [database.users[i - 1], newUser],
        lastMessages: [
          database.messages?.find(message => message.userId === i - 1) || null,
          database.messages?.find(message => message.userId === newUser.id) || null
        ]
      }

      database.chats.push(newChat)
    }
  }
}

console.log(JSON.stringify(database));