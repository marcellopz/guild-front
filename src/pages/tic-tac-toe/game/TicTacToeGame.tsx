import { Box, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TicTacToeGrid from "./TicTacToeGrid";
import TicTacToeUsers from "./TicTacToeUsers";
import { useContext, useEffect } from "react";
import { TicTacToeContext } from "../TicTacToeContext";
import { AuthContext } from "../../../contexts/authContext";
import LoadingComponent from "../../../components/LoadingComponent";
import { ArrowBackIos } from "@mui/icons-material";

function TicTacToeGame() {
  const { roomName } = useParams();
  const { setCurrentRoom, socketRef } = useContext(TicTacToeContext);
  const { authUser, authenticationFinished } = useContext(AuthContext);
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
        <div className="mb-8">
          <h1 className="text-xl">{roomName}</h1>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TicTacToeGrid />
          <Divider orientation="vertical" />
          <TicTacToeUsers />
        </Box>
      </Paper>
    </div>
  );
}

export default TicTacToeGame;
