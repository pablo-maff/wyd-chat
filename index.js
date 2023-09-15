import { faker } from "@faker-js/faker"

let database = { users: [], chats: [] };
const threshold = 20;

for (let i = 1; i <= threshold; i++) {
  database.users.push({
    id: i,
    name: faker.person.fullName(),
    lastMessage: {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime()
    },
    avatar: faker.internet.avatar(),
  });

  database.chats.push({
    id: i,
    messages: [{
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: "user"
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: "user"
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: "user"
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    },
    {
      id: faker.database.mongodbObjectId(),
      message: faker.lorem.text(),
      timestamp: faker.date.anytime(),
      user: {
        id: faker.database.mongodbObjectId()
      }
    }]
  })
}

console.log(JSON.stringify(database));