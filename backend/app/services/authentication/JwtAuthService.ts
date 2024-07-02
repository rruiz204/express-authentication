import UserRepository from "../../repositories/UserRepository";
import { MainClient } from "../../database/clients";
import Encrypt from "../../utils/encrypt";
import { type JwtLoginDTO } from "../../dto/auth/JwtLoginDTO";

async function login(body: JwtLoginDTO) {
  let user = await UserRepository.find(body, MainClient);
  if (!user) throw new Error("The user does not exist");

  const verified = await Encrypt.verify(body.password, user.password as string);
  if (!verified) throw new Error("Invalid Credentials");
  return user;
};

const JwtAuthService = { login };
export default JwtAuthService;