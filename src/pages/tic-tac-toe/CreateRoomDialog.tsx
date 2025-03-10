import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { TicTacToeContext } from "./TicTacToeContext";
import { AuthContext } from "../../contexts/authContext";

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

function CreateRoomDialog({ open, onClose }: DialogProps) {
  const [roomName, setRoomName] = React.useState("");
  const [roomPassword, setRoomPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { authUser } = useContext(AuthContext);
  const { socketRef } = useContext(TicTacToeContext);

  const handleCreateRoom = async () => {
    if (!roomName) {
      setError("Room name is required");
      return;
    }
    socketRef.current?.emit("create_gameroom", roomName, roomPassword, {
      username: authUser?.username,
      userId: authUser?._id,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setError("");
      }}
    >
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          sx={{
            marginTop: "1rem",
          }}
          label="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Room Password"
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
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
        <Button variant="contained" onClick={handleCreateRoom} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateRoomDialog;
