import { object, string } from "yup";

const validation = object({
  username: string().required().min(6),
  email: string().required().email(),
  password: string().required().min(8),
});

export default validation;