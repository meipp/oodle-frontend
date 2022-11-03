import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Poll from "./Poll";
import Helmet from "react-helmet";

const theme = createTheme();

export default function PollView() {
  const { id } = useParams();
  const [poll, setPoll] = React.useState({ title: "Loading", x: [] });
  const [loading, setLoading] = React.useState(true);

  let navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/poll/${id}`, {
          headers: {},
        });
        setPoll(data);
        setLoading(false);
      } catch {}
    }
    fetchData();
  }, [id, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{poll.title} - oodle</title>
        <meta name="description" content={poll.description}/>
      </Helmet>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Poll poll={poll} id={id} setLoading={setLoading}></Poll>
      </Container>
    </ThemeProvider>
  );
}
