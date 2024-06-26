import { PrismaClient } from "@prisma/client";
import Encrypt from "../utils/encrypt";
import { type CreateUserDTO } from "../dto/auth/CreateUserDTO";
import { type FindByNameOrEmailDTO } from "../dto/user/FindByNameOrEmailDTO";
import { type Table } from "../database/tables";

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

async function findByNameOrEmail(data: FindByNameOrEmailDTO, client: PrismaClient) {
  return await client.user.findFirst({
    where: {
      OR: [{email: data.email}, {username: data.username}]
    }
  });
};

const table: Table = "user";
const UserRepository = { table, create, findByNameOrEmail };
export default UserRepository;