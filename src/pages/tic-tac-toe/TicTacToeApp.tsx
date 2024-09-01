import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CreateRoomDialog from "./CreateRoomDialog";
import { Lock, LockOpen } from "@mui/icons-material";
import { TicTacToeContext, TicTacToeProvider } from "./TicTacToeContext";
import { AuthContext } from "../../contexts/authContext";
import RequestPasswordDialog from "./RequestPasswordDialog";

function TicTacToeTable() {
  const navigate = useNavigate();
  const { rooms } = useContext(TicTacToeContext);
  const [requestPasswordOpen, setRequestPasswordOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState("");

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
            <TableRow>
              <TableCell>Room name</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Secure</TableCell>
              <TableCell align="center">Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No rooms found
                </TableCell>
              </TableRow>
            )}
            {rooms.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.03)",
                  },
                }}
                onClick={() => {
                  if (row.hasPassword) {
                    setSelectedRoom(row.name);
                    setRequestPasswordOpen(true);
                    return;
                  }
                  navigate("/tic-tac-toe/room/" + row.name);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.owner.username}</TableCell>
                <TableCell align="center">
                  {row.hasPassword ? <Lock /> : <LockOpen />}
                </TableCell>
                <TableCell align="center">{row.users.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RequestPasswordDialog
        open={requestPasswordOpen}
        onClose={() => {
          setRequestPasswordOpen(false);
          setSelectedRoom("");
        }}
        roomName={selectedRoom}
      />
    </>
  );
}

function TicTacToeApp() {
  const { authenticated } = useContext(AuthContext);
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);
  const { roomName } = useParams();

  if (roomName) {
    return <Outlet />;
  }

  return (
    <>
      <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
        <Paper
          className="flex flex-col p-8"
          sx={{
            maxWidth: "1000px",
            width: "100%",
            // minHeight: "600px",
            overflow: "hidden",
          }}
        >
          <div className="mb-8">
            <h1 className="text-xl">Tic Tac Toe rooms</h1>
          </div>
          <TicTacToeTable />
          <div className="mt-8 flex flex-row-reverse">
            <Button
              variant="contained"
              onClick={() => {
                if (!authenticated) {
                  alert("You must be logged in to create a room");
                  return;
                }
                setCreateRoomOpen(true);
              }}
            >
              Create room
            </Button>
          </div>
        </Paper>
      </div>
      <CreateRoomDialog
        open={createRoomOpen}
        onClose={() => setCreateRoomOpen(false)}
      />
    </>
  );
}

function WrappedTicTacToeApp() {
  return (
    <TicTacToeProvider>
      <TicTacToeApp />
    </TicTacToeProvider>
  );
}

export default WrappedTicTacToeApp;
