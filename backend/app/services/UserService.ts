import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";
import { type CreateUserDTO } from "../dto/UserDTO";

async function create(body: CreateUserDTO) {
  let user = await UserRepository.find(body, MainClient);
  if (user) throw new Error("The user already exists");
  return await UserRepository.create(body, MainClient);
};

const UserService = { create };
export default UserService