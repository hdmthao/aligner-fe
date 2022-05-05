import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { userService } from "../../services";

export const CorpusView = ({ dataset, corpusData,dataSubmitted,setDataSubmitted, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [corpus, setCorpus] = useState(null);

  useEffect(() => {
    async function getCorpus() {
      let data = await userService.getAllSentencePairs(corpusData, page, size);
      setCorpus(data);
    }
    if (corpusData) getCorpus();
    if (dataSubmitted) setDataSubmitted(false);
  }, [corpusData, page, size,dataSubmitted]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataset.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSizeChange = (event) => {
    setPage(1);
    setSize(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === dataset.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < dataset.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Source corpus</TableCell>
                <TableCell>Target corpus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {corpus &&
                corpus.items.map((sentence_pair) => (
                  <TableRow
                    hover
                    key={sentence_pair.id}
                    selected={
                      selectedCustomerIds.indexOf(sentence_pair.id) !== -1
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(sentence_pair.id) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, sentence_pair.id)
                        }
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {sentence_pair.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {sentence_pair.src_sent}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {sentence_pair.tgt_sent}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={(corpus && corpus.total) || 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleSizeChange}
        page={page - 1}
        rowsPerPage={size}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// CorpusView.propTypes = {
//   dataset: PropTypes.array.isRequired,
// };