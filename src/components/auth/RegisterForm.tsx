import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function RegisterForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const handleSubmit = () => {
    let errors = {
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    };
    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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
      !errors.emailError &&
      !errors.passwordError &&
      !errors.confirmPasswordError
    ) {
      // Handle form submission logic here
      onClose();
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
        Register
      </DialogTitle>
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
          <TextField
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
