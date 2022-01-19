export const isNullOrEmpty = (str: string) => {
  return str?.trim() === '' || str === null || str === undefined;
}

export const parseUsernameFromEmail = (email: string) => {
  if (email?.indexOf("@") === -1)
    return 'unknown';

  return email.split("@")[0];
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const validateEmail = (email: string) => emailPattern.test(email);


const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/
export const validatePassword = (pass: string) => passwordPattern.test(pass);
