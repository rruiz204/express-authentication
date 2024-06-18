import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";
import Encrypt from "../utils/encrypt";
import { type CreateUserDTO } from "../dto/tasks/authentication/CreateUserDTO";
import { type LoginUserDTO } from "../dto/tasks/authentication/LoginUserDTO";

async function login(body: LoginUserDTO) {
  let user = await UserRepository.findByEmail(body.email, MainClient);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(body.password, user.password);
  if (!verified) throw new Error("Invalid Credentials");
  return user;
};

async function create(body: CreateUserDTO) {
  let user = await UserRepository.findByEmail(body.email, MainClient);
  if (user) throw new Error("The user already exists");
  return await UserRepository.create(body, MainClient);
};

const UserService = { login, create };
export default UserService