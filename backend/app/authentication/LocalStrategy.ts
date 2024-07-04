import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";
import Encrypt from "../utils/encrypt";
import { type LocalLoginDTO } from "../dto/AuthenticationDTO";
import { type ILocalStrategy } from "./IStrategy";

async function login(body: LocalLoginDTO) {
  let user = await UserRepository.find(body, MainClient);
  if (!user?.password) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(body.password, user.password);
  if (!verified) throw new Error("Invalid Credentials");
  return user;
};

const LocalStrategy: ILocalStrategy = { login };
export default LocalStrategy;