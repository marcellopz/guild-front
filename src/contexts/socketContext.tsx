import React, { useEffect, useRef, createContext } from "react";
import { io, Socket } from "socket.io-client";
import { getBaseUrl } from "../services/axios";

type userOnline = {
  id: string;
  username: string;
  socketId: string;
};

type SocketContextType = {
  socketRef: React.MutableRefObject<Socket | null>;
  socketOn: boolean;
  usersOnline: Record<string, userOnline>;
};

export const SocketContext = createContext<SocketContextType>({
  socketRef: { current: null },
  socketOn: false,
  usersOnline: {},
});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socketOn, setSocketOn] = React.useState(false);
  const [usersOnline, setUsersOnline] = React.useState<
    Record<string, userOnline>
  >({});

  useEffect(() => {
    const socket = io(getBaseUrl(), {
      withCredentials: true,
    });
    socketRef.current = socket;
    setSocketOn(true);
  }, []);

  useEffect(() => {
    socketRef.current?.on("users_online", (data) => {
      setUsersOnline(data);
    });
  }, [socketOn]);

  return (
    <SocketContext.Provider value={{ socketRef, socketOn, usersOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
