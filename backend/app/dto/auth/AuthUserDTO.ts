import Tokens from "../../utils/tokens";

async function AuthUserDTO(id: number) {
  const token = await Tokens.create({ id: id });
  return { data: { jwt: token, type: "Bearer" } };
};

export default AuthUserDTO;