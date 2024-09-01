import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { TicTacToeContext } from "./TicTacToeContext";
import { AuthContext } from "../../contexts/authContext";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  roomName: string;
}

function RequestPasswordDialog({ open, onClose, roomName }: DialogProps) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { authUser, authenticationFinished } = useContext(AuthContext);
  const { socketRef } = useContext(TicTacToeContext);

  useEffect(() => {
    if (!socketRef.current) return;
    if (!authenticationFinished) return;
    socketRef.current?.on("wrong_password", () => {
      setError("Invalid password");
    });
  }, [authenticationFinished]);

  const joinRoom = async () => {
    socketRef.current?.emit("join_gameroom", roomName, password, {
      username: authUser?.username,
      userId: authUser?._id,
    });
    // onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setError("");
      }}
    >
      <DialogTitle>Join {roomName}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          label="Room Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Typography color="error">{error}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "0 24px 24px 24px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            setError("");
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={joinRoom} color="primary">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestPasswordDialog;
