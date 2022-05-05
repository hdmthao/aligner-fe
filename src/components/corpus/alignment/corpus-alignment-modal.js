import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
} from "@mui/material";
import { userService } from "../../../services/user.service";
import { ArcherContainer, ArcherElement } from "react-archer";
import PerfectScrollbar from "react-perfect-scrollbar";

export const CorpusAlignmentModal = (props) => {
  const { sentence_pair } = props;

  // const handleSubmit = (e) => {
  //   userService.createNewSentencePair(data, dataset).then((res)=>{
  //     resetForm();
  //     setOpenPopup(false);
  //     setDataSubmitted(true);
  //   });
  // };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{}}>
          <Table>
            <TableBody>
              <TableRow sx={{}}>
                <TableCell
                  sx={{
                    paddingRight: 2,
                    paddingBottom: 10,
                    paddingTop: 5,
                    borderRight: "1px solid black",
                    fontSize: "1rem",
                    width: 100,
                  }}
                >
                  Source
                </TableCell>
                {sentence_pair &&
                  sentence_pair.src_tokenize.map((src) => (
                    <TableCell
                      sx={{
                        paddingLeft: 2,
                        paddingBottom: 10,
                        paddingTop: 5,
                      }}
                    >
                      {src}
                    </TableCell>
                  ))}
              </TableRow>
              <TableRow sx={{ m: 20 }}>
                <TableCell
                  sx={{
                    paddingRight: 2,
                    paddingBottom: 5,
                    paddingTop: 10,
                    borderRight: "1px solid black",
                    fontSize: "1rem",
                    width: 100,
                  }}
                >
                  Target
                </TableCell>

                {sentence_pair &&
                  sentence_pair.tgt_tokenize.map((tgt) => (
                    <TableCell
                      sx={{
                        paddingLeft: 2,
                        paddingBottom: 5,
                        paddingTop: 10,
                      }}
                    >
                      {tgt}
                    </TableCell>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box sx={{ my: 2 }}>
        <Grid
          container
          spacing={1}
          sx={{ mt: 0.5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Button color="primary" variant="contained">
              Auto align
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log(sentence_pair);
              }}
            >
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button color="error" variant="contained">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
