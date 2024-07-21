import AppRoutes from "./navigation/routes/routes";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./theme";
import { createTheme } from "@mui/material";
import AuthProvider from "./contexts/authContext";
import SocketProvider from "./contexts/socketContext";

export const AppName = "Guild";

const theme = createTheme(themeOptions);
// console.log(import.meta.env);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
