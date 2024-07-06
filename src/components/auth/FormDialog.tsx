import React from "react";
import { Dialog, IconButton } from "@mui/material";
import { AuthContext } from "../../contexts/authContext";
import LoginForm from "./LoginForm";
import "./form.css";
import { Close } from "@mui/icons-material";
import RegisterForm from "./RegisterForm";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose }) => {
  const { authenticated, loginFormOpen, registerFormOpen } =
    React.useContext(AuthContext);

  if (authenticated) return null;
  if (!loginFormOpen && !registerFormOpen) return null;

  const formType = loginFormOpen ? "login" : "register";

  return (
    <Dialog open={open} onClose={onClose} className="relative">
      <IconButton
        sx={{
          position: "absolute",
          margin: "10px",
          right: 0,
          color: "primary.dark",
        }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      {formType === "register" && <RegisterForm onClose={onClose} />}
      {formType === "login" && <LoginForm onClose={onClose} />}
    </Dialog>
  );
};

export default FormDialog;
