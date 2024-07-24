import { Box, Divider, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import TicTacToeGrid from "./TicTacToeGrid";
import TicTacToeUsers from "./TicTacToeUsers";

function TicTacToeGame() {
  const { roomId } = useParams();
  return (
    <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
      <Paper
        className="flex flex-col p-8"
        sx={{
          maxWidth: "1000px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div className="mb-8">
          <h1 className="text-xl">{roomId}</h1>
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
