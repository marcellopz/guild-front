import React, { createContext, useEffect } from "react";
import FormDialog from "../components/auth/FormDialog";
import { getUser, logout } from "../services/endpoints/authentication";
import { io, Socket } from "socket.io-client";
import { getBaseUrl } from "../services/axios";

// user:
// {
//   "_id": "-",
//   "name": "macelo",
//   "email": "example@test.com",
//   "role": "user",
//   "createdAt": "2024-07-02T20:29:32.376Z",
//   "updatedAt": "2024-07-02T20:29:32.376Z",
//   "__v": 0
// }

export type AuthUser = {
  _id: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loginFormOpen: boolean;
  setLoginFormOpen: (value: boolean) => void;
  registerFormOpen: boolean;
  setRegisterFormOpen: (value: boolean) => void;
  authUser: AuthUser | null;
  handleLogout: () => void;
  updateAuth: () => void;
  socketOn: boolean;
  socketRef: React.MutableRefObject<Socket | null>;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthenticated: () => {},
  loginFormOpen: false,
  setLoginFormOpen: () => {},
  registerFormOpen: false,
  setRegisterFormOpen: () => {},
  authUser: null,
  handleLogout: () => {},
  updateAuth: () => {},
  socketOn: false,
  socketRef: { current: null },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loginFormOpen, setLoginFormOpen] = React.useState(false);
  const [registerFormOpen, setRegisterFormOpen] = React.useState(false);
  const [authUser, setAuthUser] = React.useState<AuthUser | null>(null);
  const [socketOn, setSocketOn] = React.useState(false);
  const socketRef = React.useRef<Socket | null>(null);

  const updateAuth = () => {
    return getUser()
      .then((user) => {
        socketRef.current?.emit("join_server", {
          username: user.username,
          userId: user._id,
        });
        socketRef.current?.on("connect", () => {
          console.log("Connected to server");
        });
        setAuthUser(user);
        setAuthenticated(true);
        console.info("Authenticated");
        return true;
      })
      .catch(() => {
        console.info("Not authenticated");
        setAuthenticated(false);
        setAuthUser(null);
        return false;
      });
  };

  useEffect(() => {
    const socket = io(getBaseUrl(), {
      withCredentials: true,
    });
    socketRef.current = socket;
    setSocketOn(true);
    updateAuth();
  }, []);

  const handleLogout = () => {
    socketRef.current?.emit("logout");
    setAuthenticated(false);
    setAuthUser(null);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        loginFormOpen,
        setLoginFormOpen,
        registerFormOpen,
        setRegisterFormOpen,
        authUser,
        handleLogout,
        updateAuth,
        socketRef,
        socketOn,
      }}
    >
      {children}
      <FormDialog
        open={loginFormOpen || registerFormOpen}
        onClose={() => {
          setLoginFormOpen(false);
          setRegisterFormOpen(false);
        }}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
