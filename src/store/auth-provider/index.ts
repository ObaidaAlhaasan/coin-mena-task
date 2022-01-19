import {ILoggedInUser} from "../../types/user/user";
import {isNullOrEmpty, parseUsernameFromEmail} from "../../utils/string-utils";

const useAuth = (email: string, password: string): Promise<ILoggedInUser | null> => {
  if (isNullOrEmpty(email))
    return Promise.reject("Email is invalid");

  if (isNullOrEmpty(password))
    return Promise.reject("Email is invalid");
  try {
    return Promise.resolve({
      email,
      username: parseUsernameFromEmail(email),
      loggedInDate: new Date(), // assign when this user logged in to simulate refresh token
      profilePic: "/assets/images/generic-profile.png" // simulate a stored pic on server
    });
  } catch (e) {
    return Promise.reject((e as Error).message);
  }
}

export default useAuth;
