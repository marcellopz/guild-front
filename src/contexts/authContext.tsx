import React, { createContext } from "react";

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthenticated: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = React.useState(false);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
