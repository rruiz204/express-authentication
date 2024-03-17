import vine from "@vinejs/vine";

const authSchema = vine.object({
  username: vine.string().optional(),
  email: vine.string().email(),
  password: vine.string().minLength(8)
});

export const Schemas = {
  authSchema
};