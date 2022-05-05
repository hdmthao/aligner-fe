import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { userService } from "../../../services/user.service";

const initialFValues = {
  code: "",
  description: "",
  src_lang: "",
  tgt_lang: "",
};

export const DatasetCreateForm = (props) => {
  const { setDatasetSubmitted, setOpenDatasetPopup } = props;
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let currentErrors = { ...errors };
    if ("code" in fieldValues)
      currentErrors.code = fieldValues.code ? "" : "This field is required.";
    if ("description" in fieldValues)
      currentErrors.description = fieldValues.description
        ? ""
        : "This field is required.";
    if ("src_lang" in fieldValues)
      currentErrors.src_lang = fieldValues.src_lang
        ? ""
        : "This field is required.";
    if ("tgt_lang" in fieldValues)
      currentErrors.tgt_lang = fieldValues.tgt_lang
        ? ""
        : "This field is required.";
    setErrors({
      ...currentErrors,
    });

    if (fieldValues == values)
      return Object.values(currentErrors).every((error) => error == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        dataset: {
          code: values.code,
          description: values.description,
          src_lang: values.src_lang,
          tgt_lang: values.tgt_lang,
        },
      };
      userService.createNewDataset(data).then((res) => {
        resetForm();
        setOpenDatasetPopup(false);
        setDatasetSubmitted(true);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return (
    <Box sx={{ my: 2, maxWidth: 1000, width: 800 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Code"
              name="code"
              value={values.code}
              onChange={handleInputChange}
              fullWidth
              placeholder="Enter target sentence..."
              error={errors.code}
              helperText={errors.code}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              fullWidth
              placeholder="Enter target sentence..."
              error={errors.description}
              helperText={errors.description}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Source language"
              name="src_lang"
              value={values.src_lang}
              onChange={handleInputChange}
              fullWidth
              placeholder="Enter target sentence..."
              error={errors.src_lang}
              helperText={errors.src_lang}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Target language"
              name="tgt_lang"
              value={values.tgt_lang}
              onChange={handleInputChange}
              fullWidth
              placeholder="Enter target sentence..."
              error={errors.tgt_lang}
              helperText={errors.tgt_lang}
              autoComplete="off"
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ mt: 0.5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sx={{ ml: -1 }} >
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button color="error" variant="contained" onClick={resetForm}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
