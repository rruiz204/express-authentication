import { faker } from "@faker-js/faker";
import Encrypt from "../../utils/encrypt";
import { type CreateUserDTO } from "../../dto/user/CreateUserDTO";

const UserFactory = async (data: Partial<CreateUserDTO>) => {
  const hash = await Encrypt.hash(faker.internet.password());
  return {
    id: faker.number.int(),
    username: data?.username ?? faker.person.fullName(),
    email: data?.email ?? faker.internet.email(),
    password: data?.password ?? hash,
    google_id: data?.google_id ?? undefined,
    github_id: data?.github_id ?? undefined,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export default UserFactory;