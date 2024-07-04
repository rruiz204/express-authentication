import vine from "@vinejs/vine";

export const LocalAuthSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

export const RegisterSchema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

export const SocialAuthSchema = vine.object({
  code: vine.string(),
  strategy: vine.string().in(["google", "github"]),
});