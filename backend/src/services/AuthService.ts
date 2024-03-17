import vine from "@vinejs/vine";
import { type IUser } from "../types/body";
import { AuthRepository } from "../repositories/AuthRepository";
import { Schemas } from "../utils/schemas";
import { Encrypt } from "../utils/encrypt";

const createUser = async (body: IUser) => {
  const validator = vine.compile(Schemas.authSchema);
  const output = await validator.validate(body);
  
  let user = await AuthRepository.findUser(output.email);
  if (user) throw new Error("The user already exists");

  user = await AuthRepository.createUser(output as IUser);
  return user;
};

const loginUser = async (body: IUser) => {
  const validator = vine.compile(Schemas.authSchema);
  const output = await validator.validate(body);

  let user = await AuthRepository.findUser(output.email);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(output.password, user.password);
  if (!verified) throw new Error("Invalid credentials");
  
  return user;
};

export const AuthService = {
  createUser, loginUser
};