import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
  } from "@mui/material";
  import CloseIcon from '@mui/icons-material/Close';
  
  export const CorpusPopupForm = (props) => {
    const { title, children, openAlignmentPopup, handleCloseAlignment } = props;
  
    return (
      <>
        <Dialog open={openAlignmentPopup} maxWidth={false} fullWidth>
          <DialogTitle>
            <div style={{ display: "flex" }}>
              <Typography variant="h5" component="div" style={{ flexGrow: 1 }} color="info">
                {title}
              </Typography>
              <Button
                color="error"
                onClick={() => {
                    handleCloseAlignment();
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
  