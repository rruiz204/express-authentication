import { PrismaClient } from "@prisma/client";
import { type CreateUserDTO } from "../dto/tasks/authentication/CreateUserDTO";
import { type FindUserByOtherDTO } from "../dto/tasks/user/FindUserByOtherDTO";
import Encrypt from "../utils/encrypt";

async function create(data: CreateUserDTO, client: PrismaClient) {
  const password = data.password ? await Encrypt.hash(data.password) : null;
  return await client.user.create({
    data : {
      username: data.username,
      email: data.email,
      password: password,
      github_id: data.github_id,
      google_id: data.google_id,
    }
  });
};

async function findByOther(data: FindUserByOtherDTO, client: PrismaClient) {
  return await client.user.findFirst({
    where: {
      OR: [{email: data.email}, {username: data.username}]
    }
  });
};

const UserRepository = { create, findByOther };
export default UserRepository;