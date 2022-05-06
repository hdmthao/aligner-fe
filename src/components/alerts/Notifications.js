import React from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material/Alert";

export const Notification = (props) => {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "click away") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <>
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity={notify.type} onClose={handleClose}>
          {notify.message}
        </Alert>
      </Snackbar>
    </>
  );
};
