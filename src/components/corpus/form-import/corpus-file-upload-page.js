import { useState } from "react";

import {
  Input,
  Button
} from "@mui/material";
import { userService } from "../../../services/user.service";
import { alertService } from "../../../services/alert.service";

export const CorpusFileUploadPage = (props) => {
  const { datasetSlug, setOpenFileUploadPopup } = props;
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('data_file', selectedFile);
    userService.importSentencePairsFromFile(datasetSlug, formData).then((res) => {
      alertService.success(res.data.imported_sentence_pairs_count)
      setOpenFileUploadPopup(false);
    }).catch((err) => {
      alertService.error(err)
    });
    
	};


  return (
    <label htmlFor="contained-button-file">
      <Input id="contained-button-file" type="file" onChange={changeHandler}/>
      <Button variant="contained" component="span" onClick={handleSubmit}>
        Import
      </Button>
    </label>
  );
};

