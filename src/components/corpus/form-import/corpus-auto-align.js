import { useEffect } from "react";

import {
  CircularProgress
} from "@mui/material";
import { userService } from "../../../services/user.service";

export const CorpusAutoAlign = (props) => {
  const { datasetSlug, setOpenAutoAlignPopup } = props;

  useEffect(() => {
    userService.autoAlignAllSentencePairs(datasetSlug).then((res) => {
      setOpenAutoAlignPopup(false);
      window.location.reload(false);
    })
  }, [])

  return (
    <CircularProgress />
  );
};


