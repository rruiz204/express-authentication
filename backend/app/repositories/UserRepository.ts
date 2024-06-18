import { PrismaClient } from "@prisma/client";
import { type CreateUserDTO } from "../dto/tasks/authentication/CreateUserDTO";
import Encrypt from "../utils/encrypt";

async function create(data: CreateUserDTO, client: PrismaClient) {
  const password = await Encrypt.hash(data.email);
  return await client.user.create({
    data : {
      username: data.username,
      email: data.email,
      password: password,
    }
  });
}

async function findByEmail(email: string, client: PrismaClient) {
  return await client.user.findUnique({ where: { email } });
}

const UserRepository = { create, findByEmail };
export default UserRepository;