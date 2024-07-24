import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";

const usersOnline: { [key: string]: { username: string } } = {
  user1: {
    username: "User 1",
  },
  user2: {
    username: "User 2",
  },
};

function TicTacToeUsers() {
  return (
    <Box sx={{ padding: "16px", flexGrow: 1, maxWidth: "300px" }}>
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
          {Object.keys(usersOnline).map((key) => {
            return (
              <Paper key={key} className="flex gap-2 items-center p-2">
                <Avatar
                  alt={usersOnline[key].username}
                  src="/static/images/avatar/2.jpg" // implementar avatar
                />
                <Typography fontSize={18} color="primary">
                  {usersOnline[key].username}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default TicTacToeUsers;
