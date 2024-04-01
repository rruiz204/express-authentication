import prisma from "./database";
import { type IUser } from "../types/body";
import { Encrypt } from "../utils/encrypt";

const findUser = async(email: string) => {
  const user = await prisma.user.findUnique({where: { email }});
  return user;
};

const createUser = async (body: IUser) => {
  const hash = await Encrypt.hash(body.password as string);
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hash
    }
  });
  return user;
};

export const AuthRepository = {
  createUser, findUser
};