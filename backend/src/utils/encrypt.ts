import bcrypt from "bcrypt";

const hash = async (password: string) => {
  const hashed = await bcrypt.hash(password, 4);
  return hashed
}

const verify = async (password: string, hash: string) => {
  const verified = await bcrypt.compare(password, hash);
  return verified;
}

const Encrypt = { hash, verify }
export default Encrypt;