import { PrismaClient } from "@prisma/client";
import { type CreateUserDTO } from "../dto/tasks/authentication/CreateUserDTO";
import { type CreateUserBySocialDTO } from "../dto/tasks/authentication/CreateUserBySocialDTO";
import Encrypt from "../utils/encrypt";

async function create(data: CreateUserDTO, client: PrismaClient) {
  const password = await Encrypt.hash(data.password);
  return await client.user.create({
    data : {
      username: data.username,
      email: data.email,
      password: password,
    }
  });
};

async function createBySocial(data: CreateUserBySocialDTO, client: PrismaClient) {
  return await client.user.create({
    data: {
      username: data.username,
      email: data.username,
      github_id: data.github_id,
      google_id: data.google_id,
    }
  });
};

async function findByEmail(email: string, client: PrismaClient) {
  return await client.user.findUnique({ where: { email } });
};

const UserRepository = { create, createBySocial, findByEmail };
export default UserRepository;