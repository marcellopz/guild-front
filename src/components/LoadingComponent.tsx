import { Box, CircularProgress } from "@mui/material";

function LoadingComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingComponent;
