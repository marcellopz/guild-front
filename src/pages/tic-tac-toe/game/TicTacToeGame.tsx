import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TicTacToeGrid from "./TicTacToeGrid";
import TicTacToeUsers from "./TicTacToeUsers";
import { useContext, useEffect, useState } from "react";
import { TicTacToeContext } from "../TicTacToeContext";
import { AuthContext } from "../../../contexts/authContext";
import LoadingComponent from "../../../components/LoadingComponent";
import { ArrowBackIos } from "@mui/icons-material";

export interface TicTacToeGameState {
  playerTurn: string;
  grid: Grid[][];
  playerWin?: any;
  draw: boolean;
  players: Player[];
}
interface Player {
  _name: string;
  _id: string;
  _symbol: string;
}
interface Grid {
  _coordinates: number[];
  _simbol: string;
}

function TicTacToeGame() {
  const { roomName } = useParams();
  const { setCurrentRoom, socketRef, currentRoom } =
    useContext(TicTacToeContext);
  const { authUser, authenticationFinished } = useContext(AuthContext);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<TicTacToeGameState | undefined>(
    undefined
  );
  console.log(gameState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socketRef.current) return;
    if (!authenticationFinished) return;
    socketRef.current?.on("room_info", (room) => {
      setCurrentRoom(room);
    });
    socketRef.current?.emit("join_gameroom", roomName, "", {
      username: authUser?.username,
      userId: authUser?._id,
    });
    socketRef.current?.emit("get_room", roomName);
    socketRef.current?.on("room_deleted", () => {
      alert("Room owner has left the room");
      navigate("/tic-tac-toe");
    });
    socketRef.current?.on("game_started", () => {
      setGameStarted(true);
    });
    socketRef.current?.on("game_already_started", () => {
      alert("Game already started");
    });
    socketRef.current?.on("not_enough_players", () => {
      alert("Not enough players");
    });
    socketRef.current?.on("send_game_state", (gameState) => {
      setGameState(gameState);
    });
    socketRef.current?.on("testwe", (a) => {
      console.log(a);
    });
  }, [authenticationFinished]);

  if (authenticationFinished && !authUser) {
    navigate("/");
  }

  if (!authenticationFinished) {
    return <LoadingComponent />;
  }

  return (
    <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
      <Paper
        className="flex flex-col p-8 pt-6"
        sx={{
          maxWidth: "1000px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box className=" mb-4">
          <Typography
            className="cursor-pointer flex items-center"
            onClick={() => {
              navigate("/tic-tac-toe");
            }}
            variant="subtitle1"
            color="primary"
          >
            <ArrowBackIos fontSize="small" />
            <span>Back</span>
          </Typography>
        </Box>
        <div className="mb-8 flex justify-between">
          <h1 className="text-xl">{roomName}</h1>
          {currentRoom?.owner.id === authUser?._id && !gameStarted && (
            <Button
              variant="contained"
              onClick={() => {
                socketRef.current?.emit("start_game");
              }}
            >
              Start game
            </Button>
          )}
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TicTacToeGrid gameState={gameState} />
          <Divider orientation="vertical" />
          <TicTacToeUsers />
        </Box>
      </Paper>
    </div>
  );
}

export default TicTacToeGame;
