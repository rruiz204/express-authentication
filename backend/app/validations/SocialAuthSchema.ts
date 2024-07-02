import vine from "@vinejs/vine";

export default vine.object({
  code: vine.string(),
  strategy: vine.string().in(["google", "github"]),
});