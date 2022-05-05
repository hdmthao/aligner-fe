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
  source_sentence: "",
  target_sentence: "",
};

export const CorpusImportForm = (props) => {
  const { setDataSubmitted, dataset, setOpenPopup,  } = props;
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let currentErrors = { ...errors };
    if ("source_sentence" in fieldValues)
      currentErrors.source_sentence = fieldValues.source_sentence
        ? ""
        : "This field is required.";
    if ("target_sentence" in fieldValues)
      currentErrors.target_sentence = fieldValues.target_sentence
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
        sentence_pair: {
          src_sent: values.source_sentence,
          tgt_sent: values.target_sentence,
        },
      };
      userService.createNewSentencePair(data, dataset).then((res)=>{
        resetForm();
        setOpenPopup(false);
        setDataSubmitted(true);
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
        <Box sx={{ my: 2 }}>
          <TextField
            name="source_sentence"
            label="Source"
            value={values.source_sentence}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter source sentence..."
            error={errors.source_sentence}
            helperText={errors.source_sentence}
            autoComplete="off"
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Target"
            name="target_sentence"
            value={values.target_sentence}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter target sentence..."
            error={errors.target_sentence}
            helperText={errors.target_sentence}
            autoComplete="off"
          />
        </Box>
        <Grid
          container
          spacing={1}
          sx={{ mt: 0.5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
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
