import { faker } from "@faker-js/faker";
import Encrypt from "../../utils/encrypt";

const UserFactory = async () => {
  const hash = await Encrypt.hash(faker.internet.password());
  return {
    id: faker.number.int(),
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password: hash,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export default UserFactory;