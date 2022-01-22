import { emailPattern, passwordPattern, usernamePattern } from "../regex";

export const isNullOrEmpty = (str: string | number) =>
  str === null || str === undefined || str?.toString()?.trim() === "";
export const isNotNullOrEmpty = (str: string | number) => !isNullOrEmpty(str);
export const isNullOrUndefined = (obj: any) =>
  obj === null || obj === undefined;

export const parseUsernameFromEmail = (email: string) => {
  if (email?.indexOf("@") === -1) return "unknown";

  return email.split("@")[0];
};

export const validateEmail = (email: string) => emailPattern.test(email);

export const validatePassword = (pass: string) => passwordPattern.test(pass);

export const validateUsername = (text: string) => usernamePattern.test(text);
