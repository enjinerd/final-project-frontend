import {
  validateConfirmPassword,
  validateEmail,
  validateNik,
  validateNotEmpty,
  validateValue,
} from "../form-validation";

describe("Valid Value Expected", () => {
  it("Have a value", () => {
    expect(validateValue("test", validateNotEmpty)).toEqual(false);
  });
  it("Valid Email", () => {
    expect(validateValue("example@contoh.com", validateEmail)).toEqual(false);
  });
  it("Valid NIK", () => {
    expect(validateValue("1122334455667788", validateNik)).toEqual(false);
  });
  it("Valid Confirm Password", () => {
    expect(validateConfirmPassword("password", "password")).toEqual(undefined);
  });
});

describe("Invalid Value Expected", () => {
  it("Invalid value", () => {
    expect(validateValue("", validateNotEmpty)).toEqual(true);
  });
  it("Invalid Email", () => {
    expect(validateValue("example@contohom", validateEmail)).toEqual(true);
  });
  it("Invalid NIK", () => {
    expect(validateValue("1122334455667", validateNik)).toEqual(true);
  });
  it("Invalid NIK", () => {
    expect(validateConfirmPassword("missgan", "password")).toEqual(
      "Konfirmasi Kata sandi tidak cocok"
    );
  });
});
