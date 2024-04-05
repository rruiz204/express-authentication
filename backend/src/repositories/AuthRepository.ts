import { type IUser } from "../types/body";
import { PrismaClient } from "@prisma/client/extension";
import { Encrypt } from "../utils/encrypt";

const findUser = async(email: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({where: { email }});
  return user;
};

const createUser = async (body: IUser, prisma: PrismaClient) => {
  const hash = await Encrypt.hash(body.password as string);
  const user = await prisma.user.create({
    data: {
      username: body.username as string,
      email: body.email,
      password: hash
    }
  });
  return user;
};

export const AuthRepository = {
  createUser, findUser
};