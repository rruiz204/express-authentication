import AuthRepository from "../repositories/AuthRepository";
import { type IRegisterBody } from "../types/bodies";
import { MainClient } from "../database/clients";
import AuthSchema from "../validations/AuthSchema";
import Validator from "../utils/validator";
import Encrypt from "../utils/encrypt";

const createUser = async (body: IRegisterBody) => {
  const output = await Validator<IRegisterBody>(AuthSchema.register, body);

  let user = await AuthRepository.findUser(output.email, MainClient);
  if (user) throw new Error("The user already exists");

  user = await AuthRepository.createUser(output, MainClient);
  return user;
};

const AuthService = { createUser };
export default AuthService;