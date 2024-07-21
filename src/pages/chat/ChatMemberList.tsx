import { Avatar, Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { ChatUser } from "./ChatApp";

interface ChatMemberListProps {
  users: ChatUser[];
}

const ChatMemberList: FunctionComponent<ChatMemberListProps> = ({ users }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography
        variant={"h6"}
        color={"primary"}
        sx={{
          fontSize: "1rem",
        }}
      >
        {users.length} Online
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {users.map((user) => (
          <Box
            key={user.username}
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={user.username}
              src="/static/images/avatar/2.jpg" // implementar avatar
            />
            <Typography
              color={"primary"}
              sx={{
                fontSize: "1rem",
              }}
            >
              {user.username}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMemberList;
