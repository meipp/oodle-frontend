import Header from "./Header/Header";
import PollView from "./Poll/PollView";
import PollCreation from "./Poll/PollCreation";
import MatrixCreation from "./PollCreation/Matrix";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme();

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/poll/new" element={<PollCreation />}></Route>
          <Route path="/poll/matrix" element={<MatrixCreation />}></Route>
          <Route path="/poll/:id" element={<PollView />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
