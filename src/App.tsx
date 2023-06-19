import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import NoteProvider from "./context/ContextProvider";

function App() {
  return (
    <NoteProvider>
      <AppTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppTheme>
    </NoteProvider>
  );
}

export default App;
