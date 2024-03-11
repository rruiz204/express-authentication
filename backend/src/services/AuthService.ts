import vine from "@vinejs/vine";
import { type INewUser } from "../types/body";
import { AuthRepository } from "../repositories/AuthRepository";

const registerSchema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8)
});

const createUser = async (body: INewUser) => {
  const validator = vine.compile(registerSchema);
  const output = await validator.validate(body);
  
  let user = await AuthRepository.findUser(output.email);
  if (user) throw new Error("The user already exists");

  user = await AuthRepository.createUser(output)
  return user;
};

export const AuthService = {
  createUser,
}