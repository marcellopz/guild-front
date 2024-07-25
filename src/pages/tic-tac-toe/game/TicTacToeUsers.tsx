import { Avatar, Box, Paper, Typography } from "@mui/material";
import { TicTacToeContext } from "../TicTacToeContext";
import { useContext } from "react";
import TicTacToeChat from "./TicTacToeChat";

const usersOnline: { [key: string]: { username: string } } = {
  user1: {
    username: "User 1",
  },
  user2: {
    username: "User 2",
  },
};

function TicTacToeUsers() {
  const { currentRoom } = useContext(TicTacToeContext);
  console.log(currentRoom);

  return (
    <Box
      sx={{
        padding: "16px",
        flexGrow: 1,
        maxWidth: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {Object.keys(usersOnline).length === 0 ? (
        <Typography variant="h6" color="primary" className="text-center pt-8">
          No users online
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {currentRoom?.users?.map((user) => {
            return (
              <Paper key={user.id} className="flex gap-2 items-center p-2">
                <Avatar
                  alt={user.username}
                  src="/static/images/avatar/2.jpg" // implementar avatar
                />
                <Typography
                  fontSize={18}
                  color="primary"
                  sx={{ display: "flex", gap: "8px" }}
                >
                  {user.username}
                  {currentRoom.owner.id === user.id && (
                    <img src="/assets/crown.svg" height={20} width={20} />
                  )}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      )}
      <TicTacToeChat />
    </Box>
  );
}

export default TicTacToeUsers;
