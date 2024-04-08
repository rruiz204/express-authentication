import { PrismaClient } from "@prisma/client";
import { type IUserBody } from "../types/bodies";
import Encrypt from "../utils/encrypt";

const findUser = async (email: string, client: PrismaClient) => {
  const user = await client.user.findUnique({ where: { email } });
  return user;
}

const createUser = async (body: IUserBody, client: PrismaClient) => {
  const hash = await Encrypt.hash(body.password);
  const user = await client.user.create({
    data: {
      username: body.username as string,
      email: body.email,
      password: hash,
    }
  });
  return user;
}

const AuthRepository = { findUser, createUser };
export default AuthRepository;