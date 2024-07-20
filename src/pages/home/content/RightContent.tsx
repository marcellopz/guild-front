import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";

type userOnline = {
  id: string;
  username: string;
  socketId: string;
};

function RightContent() {
  const [usersOnline, setUsersOnline] = useState<Record<string, userOnline>>(
    {}
  );
  const { socketRef, socketOn } = useContext(AuthContext);

  useEffect(() => {
    socketRef.current?.on("users_online", (data) => {
      setUsersOnline(data);
    });
  }, [socketOn]);

  return (
    <Box sx={{ padding: "16px" }}>
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
          <Typography variant="h6" color="primary">
            Online users
          </Typography>
          <Divider />
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

export default RightContent;
