import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getBaseUrl } from "../../services/axios";
import { useNavigate } from "react-router-dom";

export type GameRoom = {
  name: string;
  hasPassword: boolean;
  owner: {
    id: string;
    username: string;
    socketId: string;
  };
  users: {
    id: string;
    username: string;
    socketId: string;
  }[];
};

type TicTacToeState = {
  socketRef: React.MutableRefObject<Socket | null>;
  rooms: GameRoom[];
  currentRoom: GameRoom | null;
  setCurrentRoom: React.Dispatch<React.SetStateAction<GameRoom | null>>;
};

export const TicTacToeContext = createContext<TicTacToeState>({
  socketRef: { current: null },
  rooms: [],
  currentRoom: null,
  setCurrentRoom: () => {},
});

// Create the context provider component
export const TicTacToeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [rooms, setRooms] = useState<GameRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(getBaseUrl() + "/tic-tac-toe", {
      withCredentials: true,
    });
    socketRef.current = socket;
    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });
    socket.on("existing_rooms", (_rooms) => {
      setRooms(_rooms);
    });
    socket.on("join_gameroom_response", (roomName) => {
      navigate(`/tic-tac-toe/room/${roomName}`);
    });
    // return () => {
    //   socketRef.current?.disconnect();
    // };
  }, []);

  return (
    <TicTacToeContext.Provider
      value={{ socketRef, rooms, currentRoom, setCurrentRoom }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};
