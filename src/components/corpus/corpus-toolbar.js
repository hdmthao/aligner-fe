import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Upload as UploadIcon } from "../../icons/upload";
import { userService } from "../../services";
import { useState, useEffect } from "react";
import { CorpusImportForm } from "./form-import/corpus-import-form";
import { CorpusPopupForm } from "./form-import/corpus-form-popup";
import { DatasetCreateForm } from "./form-create-dataset/dataset-create-form";
import { DatasetPopupForm } from "./form-create-dataset/dataset-form-popup";
import { CorpusFileUploadPage } from "./form-import/corpus-file-upload-page";
import { CorpusAutoAlign } from "./form-import/corpus-auto-align";

export const CorpusToolbar = (
  {
    onChangeDataset,
    setDataSubmitted,
    datasetSubmitted,
    setDatasetSubmitted,
  },
  ...props
) => {
  const [datasets, setDatasets] = useState(null);
  const [currentDataset, setCurrentDataset] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openDatasetPopup, setOpenDatasetPopup] = useState(false);
  const [openAutoAlignPopup, setOpenAutoAlignPopup] = useState(false);
  const [openFileUploadPopup, setOpenFileUploadPopup] = useState(false);

  const handleDatasetChange = (event) => {
    setCurrentDataset(event.target.value);
    onChangeDataset(event.target.value);
  };

  const handleDataChange = (newData) => {
    onChangeDataset(newData);
  };

  useEffect(() => {
    async function getDataset() {
      let data = await userService.getDatasets();
      setDatasets(data);
      if (data && data.total > 0) {
        handleDataChange(data.items[0].slug);
        setCurrentDataset(data.items[0].slug);
      }
    }
    getDataset();
    if (datasetSubmitted) setDatasetSubmitted(false);
  }, [datasetSubmitted]);

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          {/* <Typography sx={{ m: 1 }} variant="h4">
            Thesis x2
          </Typography> */}
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: 1,
            }}
          >
            <Button
              disableRipple={true}
              disableElevation={true}
              disableFocusRipple={true}
              color="primary"
              size="large"
              sx={{
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "transparent",
                  cursor: "default",
                },
              }}
            >
              Dataset
            </Button>
            <FormControl sx={{ ml: 0, p: 0, minWidth: 150 }}>
              <Select
                sx={{ m: 0, p: 0 }}
                value={currentDataset}
                onChange={handleDatasetChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {datasets &&
                  datasets.items.slice().map((dataset) => (
                    <MenuItem key={dataset.slug} value={dataset.slug}>
                      {dataset.slug}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              color="primary"
              size="large"
              onClick={() => {
                setOpenDatasetPopup(true);
              }}
            >
              Create new dataset
            </Button>
            <Button
              color="primary"
              size="large"
              onClick={() => {
                setOpenAutoAlignPopup(true);
              }}
            >
              Auto align dataset
            </Button>
          </Box>

          <Box sx={{ m: 1 }}>
            <Button
              size="large"
              sx={{ mr: 1 }}
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              Import a pair of sentences
            </Button>
            <Button
              size="large"
              startIcon={<UploadIcon fontSize="small" />}
              sx={{ mr: 1 }}
              onClick={() => {
                setOpenFileUploadPopup(true);
              }}
            >
              Import from file
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              {/* <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box> */}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <CorpusPopupForm
        title="Import a pair of sentences"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CorpusImportForm
          setDataSubmitted={setDataSubmitted}
          dataset={currentDataset}
          setOpenPopup={setOpenPopup}
        />
      </CorpusPopupForm>
      <CorpusPopupForm
        title="Import sentence pairs from file"
        openPopup={openFileUploadPopup}
        setOpenPopup={setOpenFileUploadPopup}
      >
        <CorpusFileUploadPage
          datasetSlug={currentDataset}
          setOpenFileUploadPopup={setOpenFileUploadPopup}
        />
      </CorpusPopupForm>

      <DatasetPopupForm
        title="Create new dataset"
        openDatasetPopup={openDatasetPopup}
        setOpenDatasetPopup={setOpenDatasetPopup}
      >
        <DatasetCreateForm
          setDatasetSubmitted={setDatasetSubmitted}
          setOpenDatasetPopup={setOpenDatasetPopup}
        />
      </DatasetPopupForm>

      <CorpusPopupForm
        title="Auto align"
        openPopup={openAutoAlignPopup}
        setOpenPopup={setOpenAutoAlignPopup}
      >
        <CorpusAutoAlign
          datasetSlug={currentDataset}
          setOpenAutoAlignPopup={setOpenAutoAlignPopup}
        />
      </CorpusPopupForm>
    </>
  );
};
