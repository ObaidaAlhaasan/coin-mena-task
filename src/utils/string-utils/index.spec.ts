import {
  isNullOrEmpty,
  parseUsernameFromEmail,
  validateEmail,
  validateUsername,
} from "./index";

describe("String Utils", () => {
  it("isNullOrEmpty should return correct result", function () {
    expect(isNullOrEmpty("")).toBeTruthy();
    expect(isNullOrEmpty(" ")).toBeTruthy();
    expect(isNullOrEmpty("                          ")).toBeTruthy();

    expect(isNullOrEmpty("Hello")).toBeFalsy();
    expect(isNullOrEmpty("10")).toBeFalsy();
    expect(isNullOrEmpty(1)).toBeFalsy();
  });

  it("parseUsernameFromEmail should return correct result", function () {
    const email1 = "solar@solar.com";
    const email2 = "demo@solar.com";
    const email3 = "ssd@solar.com";

    expect(parseUsernameFromEmail(email1)).toEqual("solar");
    expect(parseUsernameFromEmail(email2)).toEqual("demo");
    expect(parseUsernameFromEmail(email3)).toEqual("ssd");
  });

  it("validateEmail should return correct result", function () {
    const email1 = "solar@solar.com";
    const email2 = "ss@s@.com";
    expect(validateEmail(email1)).toBeTruthy();
    expect(validateEmail(email2)).toBeFalsy();
  });

  it("validatePassword should return correct result", function () {
    const pass1 = "pp@pp.213";
    const pass2 = " 1 ";
    expect(validateEmail(pass1)).toBeTruthy();
    expect(validateEmail(pass2)).toBeFalsy();
  });

  it("validateUsername should return correct result", function () {
    const username1 = "solar";
    const username2 = " 1 /";
    expect(validateUsername(username1)).toBeTruthy();
    expect(validateUsername(username2)).toBeFalsy();
  });
});
