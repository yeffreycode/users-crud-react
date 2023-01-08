import { createContext, ReactNode, useState } from "react";
import { UserI } from "./UserType";
export interface AppStateI {
  hola: string;
  users: UserI[];
  addUser?: (user: UserI) => void;
  removeUser?: (id: number) => void;
  addUsers?: (users: UserI[]) => void;
  updateUser?: (id: number, user: UserI) => void;
  removeUsers?: () => void;
  getUser?: (id: number) => UserI | undefined;
}
export const initialState: AppStateI = {
  hola: "",
  users: [
    { name: "carlos", lastname: "Montiel", email: "cmontiel@gmail.com", phone: 1038299032 },
    { name: "Edwin", lastname: "Ramirez", email: "eramirez@gmail.com", phone: 10382382932 },
  ],
};
export const AppContext = createContext(initialState);
export const AppState = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppStateI>(initialState);
  //functions
  const addUser = (user: UserI) => {
    setState({ ...state, users: [...state.users, user] });
  };
  const getUser = (id: number) => {
    let user = state.users.find((it, i) => i === id);
    return user;
  };
  const removeUser = (id: number) => {
    let newUsers = state.users.filter((user, index) => index !== id);
    setState({ ...state, users: newUsers });
  };
  const addUsers = (users: UserI[]) => {
    setState({ ...state, users: users });
  };
  const updateUser = (id: number, user: UserI) => {
    let newUsers = state.users.map((item, index) => {
      if (index === id) {
        item = user;
      }
      return item;
    });
    setState({ ...state, users: newUsers });
  };
  const removeUsers = () => {
    setState({ ...state, users: [] });
  };
  return <AppContext.Provider value={{ hola: state.hola, users: state.users, addUser, addUsers, updateUser, removeUser, removeUsers, getUser }}>{children}</AppContext.Provider>;
};
