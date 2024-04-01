import { faker } from "@faker-js/faker";

const UserFactory = () => {
  return {
    id: faker.number.int(),
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export default UserFactory;