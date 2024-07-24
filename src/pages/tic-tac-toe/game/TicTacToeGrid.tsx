import { Box, Paper, Typography } from "@mui/material";

const grid = [
  ["x", null, "x"],
  [null, "o", "x"],
  ["o", null, null],
];

function Cell({ value }: { value: string | null }) {
  return (
    <Box
      className="cell"
      sx={{
        width: "150px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "background.paper",
        cursor: value === null ? "pointer" : "default",
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

function TicTacToeGrid() {
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
            <Cell value={grid[0][0]} />
            <Cell value={grid[0][1]} />
            <Cell value={grid[0][2]} />
          </Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.dark",
              gap: "12px",
            }}
          >
            <Cell value={grid[1][0]} />
            <Cell value={grid[1][1]} />
            <Cell value={grid[1][2]} />
          </Box>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "primary.dark",
              gap: "12px",
            }}
          >
            <Cell value={grid[2][0]} />
            <Cell value={grid[2][1]} />
            <Cell value={grid[2][2]} />
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
