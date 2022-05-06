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
  const [srcAlignments, setSrcAlignments] = useState({});
  const [tgtAlignments, setTgtAlignments] = useState({});
  const [alignStatus, setAlignStatus] = useState("");
  const [currentAlign, setCurrentAlign] = useState({});
  const handleOnClick = (word, idx) => {
    
  };

  useEffect(() => {
    let srcAligns = JSON.parse(JSON.stringify(srcAlignments));
    let tgtAligns = JSON.parse(JSON.stringify(tgtAlignments));
    sentence_pair.alignments.map((align) => {
      let src_key = `src_${align.src_idx}`;
      let tgt_key = `tgt_${align.tgt_idx}`;
      if (!(src_key in srcAligns)) {
        srcAligns[src_key] = tgt_key;
      }
      if (!(tgt_key in tgtAligns)) {
        tgtAligns[tgt_key] = src_key;
      }
    });

    setSrcAlignments(srcAligns);
    setTgtAlignments(tgtAligns);
  }, [sentence_pair]);

  // const handleSubmit = (e) => {
  //   userService.createNewSentencePair(data, dataset).then((res)=>{
  //     resetForm();
  //     setOpenPopup(false);
  //     setDataSubmitted(true);
  //   });
  // };

  return (
    <Box>
      <PerfectScrollbar>
        <Box>
          <ArcherContainer>
            <Table>
              <TableBody>
                <TableRow>
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
                    sentence_pair.src_tokenize.map((src, idx) => (
                      <TableCell
                        key={`src_${idx}`}
                        sx={{
                          px: 0,
                          paddingBottom: 10,
                          paddingTop: 5,
                        }}
                      >
                        <ArcherElement
                          id={`src_${idx}`}
                          relations={[
                            {
                              targetId:
                                srcAlignments[`src_${idx}`] || `src_${idx}`,
                              targetAnchor: srcAlignments[`src_${idx}`]
                                ? "top"
                                : "bottom",
                              sourceAnchor: "bottom",
                              style: {
                                strokeColor: "#275efe",
                                strokeWidth: 1,
                                endMarker: false,
                              },
                            },
                          ]}
                        >
                          <Button
                            size="small"
                            sx={{
                              color: "black",
                              fontWeight: 400,
                              margin: 0,
                            }}
                            onClick={() => {
                              console.log(idx);
                            }}
                          >
                            {src}
                          </Button>
                        </ArcherElement>
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
                    sentence_pair.tgt_tokenize.map((tgt, idx) => {
                      let doAlgin = false;

                      if (
                        tgtAlignments[`tgt_${idx}`] &&
                        srcAlignments[tgtAlignments[`tgt_${idx}`]] !=
                          `tgt_${idx}`
                      )
                        doAlgin = true;

                      return (
                        <TableCell
                          key={`tgt_${idx}`}
                          sx={{
                            px: 0,
                            paddingBottom: 5,
                            paddingTop: 10,
                          }}
                        >
                          <ArcherElement
                            id={`tgt_${idx}`}
                            relations={[
                              {
                                targetId: doAlgin
                                  ? tgtAlignments[`tgt_${idx}`]
                                  : `tgt_${idx}`,
                                targetAnchor: doAlgin ? "bottom" : "top",
                                sourceAnchor: "top",
                                style: {
                                  strokeColor: "#275efe",
                                  strokeWidth: 1,
                                  endMarker: false,
                                },
                              },
                            ]}
                          >
                            <Button
                              size="small"
                              sx={{
                                color: "black",
                                fontWeight: 400,
                                margin: 0,
                              }}
                              onClick={() => {
                                console.log(idx);
                              }}
                            >
                              {tgt}
                            </Button>
                          </ArcherElement>
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableBody>
            </Table>
          </ArcherContainer>
        </Box>
        {/* </PerfectScrollbar> */}
        <Box sx={{ my: 2 }}>
          <Grid
            container
            spacing={1}
            sx={{ mt: 0.5 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  console.log();
                }}
              >
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
      </PerfectScrollbar>
    </Box>
  );
};
