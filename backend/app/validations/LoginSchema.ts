import vine from "@vinejs/vine"

export default vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});