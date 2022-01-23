import create from "zustand";
import { ILoggedInUser } from "../types/user/user";
import useAuth from "../lib/hooks/useAuth";

export interface IAppState {
  currentUser: ILoggedInUser | null;
  userSignedOut: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAlreadyLoggedIn: () => void;
}

export const useStore = create<IAppState>((set) => ({
  currentUser: null,
  userSignedOut: false,
  login: async (email: string, password: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = await useAuth(email, password);
    if (!user) return;
    set(() => ({
      currentUser: { ...user },
      userSignedOut: false,
    }));

    localStorage.setItem("currentUser", JSON.stringify(user));
  },
  logout: () => {
    set(() => ({
      currentUser: null,
      userSignedOut: true,
    }));

    localStorage.removeItem("currentUser");
  },
  checkAlreadyLoggedIn: () => {
    const currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr) {
      const user = JSON.parse(currentUserStr);
      set(() => ({
        currentUser: { ...user },
      }));
    }
  },
}));
