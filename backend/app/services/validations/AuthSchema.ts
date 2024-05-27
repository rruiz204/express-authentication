import vine from "@vinejs/vine";

const register = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

const login = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

const AuthSchema = { register, login };
export default AuthSchema;