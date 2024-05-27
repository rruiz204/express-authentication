import UserRepository from "../repositories/UserRepository";
import { type IRegisterBody, type ILoginBody } from "../types/bodies";
import { MainClient } from "../database/clients";
import AuthSchema from "./validations/AuthSchema";
import Validator from "../utils/validator";
import Encrypt from "../utils/encrypt";

const createUser = async (body: IRegisterBody) => {
  const output = await Validator<IRegisterBody>(AuthSchema.register, body);

  let user = await UserRepository.findUser(output.email, MainClient);
  if (user) throw new Error("The user already exists");

  return await UserRepository.createUser(output, MainClient);
};

const loginUser = async (body: ILoginBody) => {
  const output = await Validator<ILoginBody>(AuthSchema.login, body);

  let user = await UserRepository.findUser(output.email, MainClient);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(output.password, user.password);
  if (!verified) throw new Error("Invalid Credentials");

  return user;
};

const AuthService = { createUser, loginUser };
export default AuthService;