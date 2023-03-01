import { createContext } from "react";

const initialAppData = {
  data: null,
  dispatch: () => null
};

const AppDataContext = createContext(initialAppData);

export { AppDataContext };
