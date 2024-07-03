import { createTheme } from "@mui/material";
import AppRoutes from "./navigation/routes/routes";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./theme";

export const AppName = "Guild";

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
