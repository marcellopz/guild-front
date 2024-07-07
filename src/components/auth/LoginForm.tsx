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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [authError, setAuthError] = React.useState("");

  const handleSubmit = () => {
    let errors = {
      usernameError: "",
      passwordError: "",
    };
    // Reset error messages
    setUsernameError("");
    setPasswordError("");

    // Validate username
    if (!username) {
      setUsernameError("Username is required");
      errors.usernameError = "Username is required";
    } else if (!isValidUsername(username)) {
      setUsernameError("Username must be between 3 and 15 characters long");
      errors.usernameError =
        "Username must be between 3 and 15 characters long";
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
    if (!errors.usernameError && !errors.passwordError) {
      login(username, password)
        .then((res) => {
          if (res.status === 200) {
            updateAuth();
            onClose();
            return;
          }
        })
        .catch(() => {
          setAuthError("Invalid username or password");
        });
    }
  };

  const isValidUsername = (username: string) => {
    return username.length >= 3 && username.length <= 15;
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
            label="Username"
            id="username-guild"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="dense"
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDownCapture={(e) => e.key === "Enter" && handleSubmit()}
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
