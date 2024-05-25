import { describe, test, expect } from "vitest";
import { type IRegisterBody } from "../../types/bodies";
import AuthSchema from "../../services/validations/AuthSchema";
import Validator from "../../utils/validator";

describe("Validation Utils", () => {
  test("Validation Positive Case", async () => {
    const data: IRegisterBody = {
      username: "root",
      email: "root@gmail.com",
      password: "root1234",
    };

    const output = await Validator<IRegisterBody>(AuthSchema.register, data);
    expect(output.email).toEqual(data.email);
  });

  test("Validation Negavite Case", async () => {
    const data: IRegisterBody = {
      username: "root",
      email: "fail_email",
      password: "123",
    };

    try {
      await Validator<IRegisterBody>(AuthSchema.register, data);
    } catch (error: any) {
      expect(error.messages.lenght).not.toEqual(0);
    }
  });
});