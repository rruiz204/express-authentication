import { faker } from "@faker-js/faker";
import type { ModelUserDTO, CreateUserDTO } from "../../dto/UserDTO";

const UserFactory = async (data: Partial<CreateUserDTO>): Promise<ModelUserDTO> => {
  return {
    id: faker.number.int(),
    username: data?.username ?? faker.person.fullName(),
    email: data?.email ?? faker.internet.email(),
    password: data?.password ?? null,
    google_id: data?.google_id ?? null,
    github_id: data?.github_id ?? null,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export default UserFactory;