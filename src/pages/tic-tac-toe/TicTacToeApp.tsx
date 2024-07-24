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
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CreateRoomDialog from "./CreateRoomDialog";
import { Lock, LockOpen } from "@mui/icons-material";

const rows = [
  {
    name: "Casca de bala",
    owner: "John",
    hasPassword: true,
    members: 3,
  },
  {
    name: "Bom dia",
    owner: "Sarah",
    hasPassword: false,
    members: 2,
  },
  {
    name: "Ficar fortão",
    owner: "Michael",
    hasPassword: false,
    members: 4,
  },
  {
    name: "Rebolar pros crias",
    owner: "Emily",
    hasPassword: true,
    members: 1,
  },
  {
    name: "Swarm",
    owner: "David",
    hasPassword: false,
    members: 2,
  },
];

function TicTacToeTable() {
  const navigate = useNavigate();

  return (
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
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No rooms found
              </TableCell>
            </TableRow>
          )}
          {rows.map((row) => (
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
                navigate("/tic-tac-toe/room/" + row.name);
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.owner}</TableCell>
              <TableCell align="center">
                {row.hasPassword ? <Lock /> : <LockOpen />}
              </TableCell>
              <TableCell align="center">{row.members}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TicTacToeApp() {
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);
  const { roomId } = useParams();

  if (roomId) {
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

export default TicTacToeApp;
