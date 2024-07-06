import AppRoutes from "./navigation/routes/routes";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./theme";
import { createTheme } from "@mui/material";
import AuthProvider from "./contexts/authContext";

export const AppName = "Guild";

const theme = createTheme(themeOptions);
// console.log(import.meta.env);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
