import { Box, Divider, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

type Game = {
  name: string;
  picture: string;
  url: string;
};

function GameBox({ game }: { game: Game }) {
  return (
    <Paper
      component={Link}
      to={game.url}
      sx={{
        background: 'url("assets/league.jpg")',
        backgroundSize: "cover",
        width: "100%",
        maxWidth: {
          xs: "unset",
          md: "200px",
        },
        height: {
          xs: "150px",
          md: "120px",
        },
        ":hover": {
          boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.03)",
        },
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 10%, transparent 100%)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          color: "white",
          fontWeight: "primary.contrastText",
          padding: "8px",
        }}
      >
        <h3>{game.name}</h3>
      </Box>
    </Paper>
  );
}

function LeftContent() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
        }}
      >
        <GameBox
          game={{
            name: "game1",
            picture: "pic1",
            url: "url1",
          }}
        />
        <GameBox
          game={{
            name: "game1",
            picture: "pic1",
            url: "url1",
          }}
        />
        <GameBox
          game={{
            name: "game1",
            picture: "pic1",
            url: "url1",
          }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          borderWidth: "1px",
          borderRadius: "4px",
          borderColor: "rgba(0, 0, 0, 0.12)",
          padding: "16px",
          marginTop: "8px",
          boxShadow:
            "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography>Chatrooms</Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& > div:nth-of-type(even)": {
              backgroundColor: "#f5e8cd6e",
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: "8px",
                "&:hover": {
                  backgroundColor: "#f5e8cd",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/chat/" + i)}
            >
              <Typography>Chatroom {i}</Typography>
              <Typography>0/100</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LeftContent;
