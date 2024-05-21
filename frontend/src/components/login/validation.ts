import { object, string } from "yup";

const validation = object({
  email: string().required().email(),
  password: string().required().min(8),
});

export default validation;