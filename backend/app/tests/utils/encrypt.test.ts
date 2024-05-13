import { describe, test, expect } from "vitest";
import Encrypt from "../../utils/encrypt";

describe("Encrypt Util", () => {
  const password = "test_password";

  test("Hash Method", async () => {  
    const hash = await Encrypt.hash(password);
    expect(hash).not.toEqual(password);
  });

  test("Verify Method", async () => {
    const hash = await Encrypt.hash(password);
    const verified = await Encrypt.verify(password, hash);
    expect(verified).toEqual(true);
  });
});