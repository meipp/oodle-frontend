import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import Poll from "../Poll";
import { Helmet } from "react-helmet-async";

export default function PollView() {
  const { id } = useParams();

  if(id === undefined) {
    throw new Error("id is undefined");
  }

  const [poll, setPoll] = React.useState({ title: "Loading", description: "", x: [], y: undefined, responses: [] });
  const [loading, setLoading] = React.useState(true);

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
    <>
      <Helmet>
        <title>{poll.title} - oodle</title>
        <meta name="description" content={poll.description}/>
      </Helmet>

      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Poll poll={poll} id={id} setLoading={setLoading}></Poll>
      </Container>
    </>
  );
}
