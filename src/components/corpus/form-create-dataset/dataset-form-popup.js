import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const DatasetPopupForm = (props) => {
  const { title, children, openDatasetPopup, setOpenDatasetPopup } = props;

  return (
    <>
      <Dialog open={openDatasetPopup} maxWidth="md">
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }} color="primary" >
              {title}
            </Typography>
            <Button
              color="error"
              onClick={() => {
                setOpenDatasetPopup(false);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};
