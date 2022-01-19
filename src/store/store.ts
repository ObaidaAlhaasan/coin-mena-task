import create from "zustand";
import {ILoggedInUser} from "../types/user/user";
import useAuth from "./auth-provider";

interface IAppState {
  currentUser: ILoggedInUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}


export const useStore = create<IAppState>((set) => ({
  currentUser: null,
  login: async (email: string, password: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = await useAuth(email, password);
    if (!user)
      return;
    set((state) => ({
      currentUser: {...user}
    }));
  },
  logout: () => {
    set((state) => ({
      currentUser: null
    }));
  }
}));
