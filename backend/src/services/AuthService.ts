import { type IUserBody } from "../types/bodies";
import AuthRepository from "../repositories/AuthRepository";
import Encrypt from "../utils/encrypt";
import Schemas from "../utils/schemas";
import { MainClient } from "../repositories/database";
import vine from "@vinejs/vine";

const createUser = async (body: IUserBody) => {
  const validtor = vine.compile(Schemas.authSchema);
  const output = await validtor.validate(body);

  let user = await AuthRepository.findUser(output.email, MainClient);
  if (user) throw Error("The user already exists");

  user = await AuthRepository.createUser(output, MainClient);
  return user;
}

const AuthService = { createUser };
export default AuthService;