import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CorpusView } from "../components/corpus/corpus-view";
import { CorpusToolbar } from "../components/corpus/corpus-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers as dataset } from "../__mocks__/customers";
import { userService } from "../services";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Corpus = () => {
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState(null);
  const handleDataChange = (newData) => {
    setData(newData);
  };
  const router = useRouter();

  useEffect(() => {
    if (!userService.userValue) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  return (
    authorized && (
      <>
        <Head>
          <title>Aligner | Thesis x2 </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CorpusToolbar onChangeDataset={(newData) => handleDataChange(newData)} />
            <Box sx={{ mt: 3 }}>
              <CorpusView dataset={dataset} corpusData={data} />
            </Box>
          </Container>
        </Box>
      </>
    )
  );
};
Corpus.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Corpus;
