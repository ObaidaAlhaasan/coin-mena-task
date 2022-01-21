import {emailPattern, passwordPattern, textPattern} from "../regex";

export const isNullOrEmpty = (str: string | number) =>  str?.toString()?.trim() === '' || str === null || str === undefined;

export const parseUsernameFromEmail = (email: string) => {
  if (email?.indexOf("@") === -1)
    return 'unknown';

  return email.split("@")[0];
}

export const validateEmail = (email: string) => emailPattern.test(email);

export const validatePassword = (pass: string) => passwordPattern.test(pass);

export const validateText = (text: string) => textPattern.test(text);
