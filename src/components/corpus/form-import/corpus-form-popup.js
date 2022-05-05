import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const CorpusPopupForm = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <>
      <Dialog open={openPopup} maxWidth="md">
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }} color="primary">
              {title}
            </Typography>
            <Button
              color="error"
              onClick={() => {
                setOpenPopup(false);
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
