import { createContext, ReactNode } from "react";

interface IGlobalState {
  sessionId: string;
  accountId: string;
}

export interface IGlobalContext {
  globalState: IGlobalState;
  handleUpdateSessionIdAccountId: (value: string, accountId: string) => void;
  handleResetGlobal: () => void;
}

interface IGlobalProvider {
  children: ReactNode;
}

const initialState: IGlobalState = {
  sessionId: "",
  accountId: "",
};

export const GlobalContext = createContext<IGlobalContext>({
  globalState: initialState,
  handleUpdateSessionIdAccountId: () => {},
  handleResetGlobal: () => {},
});

const { Provider } = GlobalContext;
