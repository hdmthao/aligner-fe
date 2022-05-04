import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { userService } from "../../services";
import { useState, useEffect } from "react";

export const CorpusToolbar = ({ onChangeDataset }, ...props) => {
  const [datasets, setDatasets] = useState(null);
  const [currentDataset, setCurrentDataset] = useState("");

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
      if (data && data.total > 0) handleDataChange(data.items[0].slug);
    }
    getDataset();
  }, []);

  return (
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
        <Typography sx={{ m: 1 }} variant="h4">
          Thesis x2
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained">
            Dataset
            <Select
              value={currentDataset}
              onChange={handleDatasetChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {datasets && datasets.items.slice().map((dataset) => (
                <MenuItem value={dataset.slug}>{dataset.slug}</MenuItem>
              ))}
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
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
  );
};
