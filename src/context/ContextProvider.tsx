import { createContext, useContext, useReducer } from "react";
import storeReducer, { initialValues } from "./noteReducer";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  return (
    <NoteContext.Provider value={useReducer(storeReducer, initialValues)}>
      {children}
    </NoteContext.Provider>
  );
};

const useStore = () => {
  return useContext(NoteContext)[0];
};
const useDispatch = () => useContext(NoteContext)[1];

export { NoteContext, useStore, useDispatch };
export default NoteProvider;