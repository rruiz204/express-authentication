import { PrismaClient } from "@prisma/client";
import { type IRegisterBody } from "../types/bodies";
import Encrypt from "../utils/encrypt";

const createUser = async (data: IRegisterBody, client: PrismaClient) => {
  const hash = await Encrypt.hash(data.password);
  const user = await client.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hash,
    }
  });
  return user;
};


const findUser = async (email: string, client: PrismaClient) => {
  const user = await client.user.findUnique({ where: { email } });
  return user;
};

const AuthRepository = { createUser, findUser };
export default AuthRepository;