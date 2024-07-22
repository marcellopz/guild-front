import { FunctionComponent, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatApp";
import { Avatar, Box, TextField, Typography } from "@mui/material";

interface ChatMessagesProps {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
}

const ChatMessages: FunctionComponent<ChatMessagesProps> = ({
  messages,
  sendMessage,
}) => {
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          flexGrow: 1,
          height: "550px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          ref={messagesBoxRef}
        >
          {messages.map((message) => (
            <Box
              sx={{
                display: "flex",
                padding: "8px",
                gap: "8px",
                alignItems: "center",
                ":hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                },
              }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={message.user.username}
                src="/static/images/avatar/2.jpg" // implementar avatar
              />
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Typography fontWeight={700}>
                    {message.user.username}
                  </Typography>
                  <Typography fontSize={11}>
                    {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Typography sx={{ textWrap: "wrap" }}>
                  {message.message}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <TextField
        id="message"
        variant="filled"
        placeholder="Message"
        autoComplete="off"
        fullWidth
        inputProps={{
          sx: {
            padding: "16px",
          },
        }}
        InputProps={{
          sx: {
            padding: 0,
          },
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            if (target.value === "") return;
            sendMessage(target.value);
            target.value = "";
          }
        }}
      />
    </Box>
  );
};

export default ChatMessages;
