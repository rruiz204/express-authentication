import vine from "@vinejs/vine"

export default vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string().minLength(8),
});