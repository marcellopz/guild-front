import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { register } from "../../services/endpoints/authentication";
import { AuthContext } from "../../contexts/authContext";

function RegisterForm({ onClose }: { onClose: () => void }) {
  const { updateAuth } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");

  const handleSubmit = () => {
    let errors = {
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
    };
    // Reset error messages
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      errors.confirmPasswordError = "Confirm password is required";
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      errors.confirmPasswordError = "Passwords do not match";
    }

    // If there are no errors, submit the form
    if (
      !errors.usernameError &&
      !errors.passwordError &&
      !errors.confirmPasswordError
    ) {
      register(username, password)
        .then((res) => {
          if (res.status === 201) {
            updateAuth();
            onClose();
            return;
          }
        })
        .catch(() => {
          setRegisterError("Error registering user");
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
        Register
      </DialogTitle>
      {registerError && (
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
          {registerError}
        </Typography>
      )}
      <DialogContent sx={{ maxWidth: "350px", padding: "16px 24px" }}>
        <form>
          <TextField
            label="Username"
            id="username"
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
            fullWidth
            margin="dense"
            type="password"
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDownCapture={(e) => e.key === "Enter" && handleSubmit()}
            fullWidth
            margin="dense"
            type="password"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
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
          Register
        </Button>
      </DialogActions>
    </>
  );
}

export default RegisterForm;
