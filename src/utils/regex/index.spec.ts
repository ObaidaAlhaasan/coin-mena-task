import { emailPattern, passwordPattern, usernamePattern } from "./index";

describe("Regex Utils patterns", () => {
  it("valid username pattern should return true", function () {
    const username = "Solar";
    expect(usernamePattern.test(username)).toBeTruthy();
  });

  it("invalid username pattern should return false", function () {
    const username = "--s-s";
    expect(usernamePattern.test(username)).toBeFalsy();
    expect(usernamePattern.test("")).toBeFalsy();
    expect(usernamePattern.test(" ")).toBeFalsy();
  });

  it("valid email pattern should return true", function () {
    const email = "solar@solar.com";
    expect(emailPattern.test(email)).toBeTruthy();
  });

  it("invalid email pattern should return false", function () {
    const email = "so@@so.com";
    const email2 = "so@@solar..com";
    expect(emailPattern.test(email)).toBeFalsy();
    expect(emailPattern.test(email2)).toBeFalsy();
    expect(emailPattern.test("")).toBeFalsy();
    expect(emailPattern.test(" ")).toBeFalsy();
    expect(emailPattern.test("@# ")).toBeFalsy();
    expect(emailPattern.test("1 ")).toBeFalsy();
    expect(emailPattern.test("1@1.com ")).toBeFalsy();
  });

  it("valid password pattern should return true", function () {
    const password = "pass@123";
    expect(passwordPattern.test(password)).toBeTruthy();
  });

  it("invalid password pattern should return false", function () {
    const password = "so@@so.comwwwwwwww";
    const password2 = "so@@solar..comwwwwwwwww";
    expect(passwordPattern.test(password)).toBeFalsy();
    expect(passwordPattern.test(password2)).toBeFalsy();
    expect(passwordPattern.test("")).toBeFalsy();
    expect(passwordPattern.test(" ")).toBeFalsy();
    expect(passwordPattern.test("@ ")).toBeFalsy();
    expect(passwordPattern.test("1 ")).toBeFalsy();
    expect(passwordPattern.test("1123@@ ")).toBeFalsy();
  });
});
