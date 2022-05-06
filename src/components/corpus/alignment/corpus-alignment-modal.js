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
  const [alignStatus, setAlignStatus] = useState("initial");
  const [currentAlign, setCurrentAlign] = useState({
    src: "",
    tgt: "",
    cur: "",
  });

  const handleOnClickWord = (word, idx) => {
    console.log(word, idx);
    let curAlign = JSON.parse(JSON.stringify(currentAlign));
    if (alignStatus != "aligning") {
      setAlignStatus("aligning");
      curAlign[word] = `${word}_${idx}`;
      curAlign.cur = word;
    } else if (alignStatus == "aligning") {
      if (curAlign[word] == `${word}_${idx}`) {
        setAlignStatus("unaligned");
        curAlign.cur = "";
        curAlign[word] = "";
      } else if (curAlign.cur == word) {
        curAlign[word] = `${word}_${idx}`;
      } else {
        curAlign[word] = `${word}_${idx}`;
        setAlignStatus("aligned");
      }
    }
    setCurrentAlign(curAlign);
  };

  const handleDeleteAlign = () => {
    setAlignStatus("deleting");
  };

  useEffect(() => {
    let srcAligns = JSON.parse(JSON.stringify(srcAlignments));
    let tgtAligns = JSON.parse(JSON.stringify(tgtAlignments));
    if (alignStatus == "initial") {
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
    } else {
      if (alignStatus == "aligned") {
        let src_key = currentAlign.src;
        let tgt_key = currentAlign.tgt;
        if (!(src_key in srcAligns)) {
          srcAligns[src_key] = tgt_key;
        }
        if (!(tgt_key in tgtAligns)) {
          tgtAligns[tgt_key] = src_key;
        }
        setCurrentAlign({
          src: "",
          tgt: "",
          cur: "",
        });
      }
      if (alignStatus == "deleting") {
        let src_key = currentAlign.src;
        let tgt_key = currentAlign.tgt;
        if (src_key != "") {
          delete srcAligns[src_key];
          for (let key in tgtAligns) {
            if (tgtAligns[key] == src_key) {
              delete tgtAligns[key];
            }
          }
        }
        if (tgt_key != "") {
          delete tgtAligns[tgt_key];
          for (let key in srcAligns) {
            if (srcAligns[key] == tgt_key) {
              delete srcAligns[key];
            }
          }
        }
        setCurrentAlign({
          src: "",
          tgt: "",
          cur: "",
        });
      }
    }
    setSrcAlignments(srcAligns);
    setTgtAlignments(tgtAligns);
    console.log("source", srcAligns);
    console.log("target", tgtAligns);
  }, [sentence_pair, alignStatus]);

  const handleUpdateAligns = () => {
    const dataset_slug = sentence_pair.dataset_slug;
    const sentence_pair_id = sentence_pair.id;
    const alignments = [];
    for (const [src, tgt] of Object.entries(srcAlignments)) {
      const srcIdx = src.match(/\d+/g)[0];
      const tgtIdx = tgt.match(/\d+/g)[0];
      alignments.push({ src_idx: srcIdx, tgt_idx: tgtIdx })
    }
    for (const [tgt, src] of Object.entries(tgtAlignments)) {
      const srcIdx = src.match(/\d+/g)[0];
      const tgtIdx = tgt.match(/\d+/g)[0];
      const found = alignments.find(e => e.src_idx === srcIdx && e.tgt_idx == tgtIdx);
      if (!found) alignments.push({ src_idx: srcIdx, tgt_idx: tgtIdx })
    }
    userService
      .updateAlignOneSentencePair(dataset_slug, sentence_pair_id, { alignments })
      .then((res) => {console.log(res)});
  };

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
                              color:
                                currentAlign.src == `src_${idx}`
                                  ? "red"
                                  : "black",
                              fontWeight: 400,
                              margin: 0,
                            }}
                            onClick={() => {
                              handleOnClickWord("src", idx);
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
                                color:
                                  currentAlign.tgt == `tgt_${idx}`
                                    ? "red"
                                    : "black",
                                fontWeight: 400,
                                margin: 0,
                              }}
                              onClick={() => {
                                handleOnClickWord("tgt", idx);
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
                color="success"
                variant="contained"
                onClick={() => {
                  handleUpdateAligns();
                }}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  handleDeleteAlign();
                }}
              >
                Delete align
              </Button>
            </Grid>
          </Grid>
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};
