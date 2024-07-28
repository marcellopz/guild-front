import { Box, Typography } from "@mui/material";
import { TicTacToeGameState } from "./TicTacToeGame";
import { TicTacToeContext } from "../TicTacToeContext";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

function Cell({ value, coords }: { value: string; coords: [number, number] }) {
  const { socketRef } = useContext(TicTacToeContext);
  const { authUser } = useContext(AuthContext);
  return (
    <Box
      className="cell"
      onClick={() => {
        if (value === "") {
          console.log('emit "front_player_play"', authUser?._id, coords);
          console.log(socketRef.current);
          socketRef.current?.emit("front_player_play", authUser?._id, coords);
        }
      }}
      sx={{
        width: "150px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "background.paper",
        cursor: value === "" ? "pointer" : "default",
        "&:hover": {
          backgroundColor: "background.default",
        },
      }}
    >
      {value === "x" && (
        <img src="/assets/tictactoe/x.png" style={{ userSelect: "none" }} />
      )}
      {value === "o" && (
        <img src="/assets/tictactoe/o.png" style={{ userSelect: "none" }} />
      )}
    </Box>
  );
}

function TicTacToeGrid({ gameState }: { gameState?: TicTacToeGameState }) {
  if (!gameState) return null;
  return (
    <Box className="flex">
      <Box>
        <Box
          sx={{
            padding: 0,
            backgroundColor: "primary.dark",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.dark",
              gap: "12px",
            }}
          >
            <Cell value={gameState.grid[0][0]._simbol} coords={[0, 0]} />
            <Cell value={gameState.grid[0][1]._simbol} coords={[0, 1]} />
            <Cell value={gameState.grid[0][2]._simbol} coords={[0, 2]} />
          </Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.dark",
              gap: "12px",
            }}
          >
            <Cell value={gameState.grid[1][0]._simbol} coords={[1, 0]} />
            <Cell value={gameState.grid[1][1]._simbol} coords={[1, 1]} />
            <Cell value={gameState.grid[1][2]._simbol} coords={[1, 2]} />
          </Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.dark",
              gap: "12px",
            }}
          >
            <Cell value={gameState.grid[2][0]._simbol} coords={[2, 0]} />
            <Cell value={gameState.grid[2][1]._simbol} coords={[2, 1]} />
            <Cell value={gameState.grid[2][2]._simbol} coords={[2, 2]} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            marginTop: "12px",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">It's your turn</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TicTacToeGrid;
