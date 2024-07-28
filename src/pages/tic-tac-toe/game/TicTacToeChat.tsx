import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { TicTacToeContext } from "../TicTacToeContext";
import { ChatMessage } from "../../chat/ChatApp";
import { Box, TextField } from "@mui/material";
import { AuthContext } from "../../../contexts/authContext";

function TicTacToeChat() {
  const { socketRef } = useContext(TicTacToeContext);
  const { authUser } = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current?.on("back_new_message", (message: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socketRef]);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  const sendMessage = useCallback(
    function (message: string) {
      console.log("sending message");
      socketRef.current?.emit("front_new_message", {
        message,
        createdAt: new Date().toISOString(),
        user: {
          userId: authUser?._id,
          username: authUser?.username,
        },
      });
    },
    [socketRef]
  );

  return (
    <Box>
      <Box
        sx={{
          height: "150px",
          maxHeight: "150px",
          overflowY: "auto",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        }}
        ref={messagesBoxRef}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: "2px",
            minHeight: "100%",
          }}
        >
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              sx={{ display: "flex", padding: "2px 8px", gap: "2px" }}
            >
              <p>{message.user.username}:</p>
              <p>{message.message}</p>
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
      <button
        onClick={() => {
          socketRef.current?.emit("start_game");
        }}
      >
        xd2
      </button>
    </Box>
  );
}

export default TicTacToeChat;
