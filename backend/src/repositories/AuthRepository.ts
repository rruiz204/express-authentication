import { prisma } from "./database";
import { type INewUser } from "../types/body";

const findUser = async(email: string) => {
  const user = await prisma.user.findUnique({where: { email }});
  return user;
};

const createUser = async (body: INewUser) => {
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: body.password
    }
  });
  return user;
};

export const AuthRepository = {
  createUser, findUser
};