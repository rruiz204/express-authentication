import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";
import Encrypt from "../utils/encrypt";
import { type CreateUserDTO } from "../dto/auth/CreateUserDTO";
import { type LoginUserDTO } from "../dto/auth/LoginUserDTO";

async function login(body: LoginUserDTO) {
  let user = await UserRepository.findByNameOrEmail(body, MainClient);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(body.password, user.password as string);
  if (!verified) throw new Error("Invalid Credentials");
  return user;
};

async function create(body: CreateUserDTO) {
  let user = await UserRepository.findByNameOrEmail(body, MainClient);
  if (user) throw new Error("The user already exists");
  return await UserRepository.create(body, MainClient);
};

const UserService = { login, create };
export default UserService