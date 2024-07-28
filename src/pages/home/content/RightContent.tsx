import { useContext } from "react";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { SocketContext } from "../../../contexts/socketContext";

function RightContent() {
  const { usersOnline } = useContext(SocketContext);

  return (
    <Box sx={{ padding: "16px" }}>
      {usersOnline.length === 0 ? (
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
          <Typography variant="h6" color="primary">
            Online users
          </Typography>
          <Divider
            sx={{
              height: "100%",
            }}
          />
          {usersOnline.map((user) => {
            return (
              <Paper key={user.id} className="flex gap-2 items-center p-2">
                <Avatar
                  alt={user.username}
                  src="/static/images/avatar/2.jpg" // implementar avatar
                />
                <Typography fontSize={18} color="primary">
                  {user.username}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default RightContent;
