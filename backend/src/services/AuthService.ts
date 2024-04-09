import { type IUserBody } from "../types/bodies";
import AuthRepository from "../repositories/AuthRepository";
import Encrypt from "../utils/encrypt";
import Schemas from "../utils/schemas";
import { MainClient } from "../repositories/database";
import vine from "@vinejs/vine";

const createUser = async (body: IUserBody) => {
  const validator = vine.compile(Schemas.authSchema);
  const output = await validator.validate(body);

  let user = await AuthRepository.findUser(output.email, MainClient);
  if (user) throw Error("The user already exists");

  user = await AuthRepository.createUser(output, MainClient);
  return user;
}

const loginUser = async (body: IUserBody) => {
  const validator = vine.compile(Schemas.authSchema);
  const output = await validator.validate(body);

  let user = await AuthRepository.findUser(output.email, MainClient);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(output.password, user.password);
  if (!verified) throw new Error("Invalid credentials");

  return user;
}

const AuthService = { createUser, loginUser };
export default AuthService;