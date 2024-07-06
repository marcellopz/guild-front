import { Box, Paper } from "@mui/material";

function HomeHeader() {
  return (
    <Box>
      <Box
        className="w-full z-0"
        sx={{
          marginBottom: "40px",
          height: "180px",
          backgroundColor: "primary.light",
        }}
      >
        <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
          <Paper
            sx={{
              height: "200px",
              maxWidth: "1000px",
              width: "100%",
              backgroundImage: "url('/assets/league.jpg')",
              backgroundSize: "cover",
            }}
          >
            {/* Banner ? */}
          </Paper>
        </div>
      </Box>
    </Box>
  );
}
export default HomeHeader;
