const hash = async (password: string) => {
  return await Bun.password.hash(password, {algorithm: "bcrypt", cost: 4});
};

const verify = async (password: string, hash: string) => {
  return await Bun.password.verify(password, hash);
};

export const Encrypt = {
  hash, verify
};