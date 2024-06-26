import { PrismaClient } from "@prisma/client";
import Encrypt from "../utils/encrypt";
import { type CreateUserDTO } from "../dto/auth/CreateUserDTO";
import { type FindUserDTO } from "../dto/user/FindUserDTO";
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

async function find({ id, username, email }: FindUserDTO, client: PrismaClient) {
  return await client.user.findFirst({
    where: { OR: [{id}, {username}, {email}] }
  });
};

const table: Table = "user";
const UserRepository = { table, create, find };
export default UserRepository;