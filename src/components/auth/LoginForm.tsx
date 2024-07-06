import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { login } from "../../services/endpoints/authentication";
import { AuthContext } from "../../contexts/authContext";

function LoginForm({ onClose }: { onClose: () => void }) {
  const { updateAuth } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [authError, setAuthError] = React.useState("");

  const handleSubmit = () => {
    let errors = {
      emailError: "",
      passwordError: "",
    };
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      errors.emailError = "Email is required";
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      errors.emailError = "Invalid email format";
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      errors.passwordError = "Password is required";
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      errors.passwordError = "Password must be at least 6 characters long";
    }

    // If there are no errors, submit the form
    if (!errors.emailError && !errors.passwordError) {
      login(email, password)
        .then((res) => {
          if (res.status === 200) {
            updateAuth();
            onClose();
            return;
          }
        })
        .catch(() => {
          setAuthError("Invalid email or password");
        });
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <DialogTitle
        sx={{ backgroundColor: "background.default", color: "primary.dark" }}
      >
        Login
      </DialogTitle>
      {authError && (
        <Typography
          sx={{
            color: "error.dark",
            margin: "16px 24px 0 24px",
            fontSize: "16px",
            padding: "12px",
            backgroundColor: "#f8d7da",
            borderRadius: "4px",
            border: "1px solid",
            borderColor: "error.main",
          }}
        >
          {authError}
        </Typography>
      )}
      <DialogContent sx={{ maxWidth: "350px", padding: "16px 24px" }}>
        <form>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            type="password"
            error={!!passwordError}
            helperText={passwordError}
          />
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "0 24px 24px 24px",
        }}
      >
        <Button
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </DialogActions>
    </>
  );
}

export default LoginForm;
