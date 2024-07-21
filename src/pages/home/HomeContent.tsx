import { Box, Divider, Paper } from "@mui/material";
import LeftContent from "./content/LeftContent";
import RightContent from "./content/RightContent";

function HomeContent() {
  return (
    <div className="flex justify-center p-4 md:p-8">
      <Paper
        className="flex flex-col md:flex-row"
        sx={{
          maxWidth: "1000px",
          width: "100%",
          minHeight: "600px",
        }}
      >
        <Box className="w-full md:w-2/3">
          <LeftContent />
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            height: "calc(100% - 32px)",
            marginY: "16px",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box className="w-full md:w-1/3">
          <RightContent />
        </Box>
      </Paper>
    </div>
  );
}

export default HomeContent;
