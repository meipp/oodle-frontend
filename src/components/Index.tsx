import Header from "./Header/Header";
import PollView from "./Poll/View/PollView";
import PollCreationQuick from "./Poll/Creation/PollCreationQuick";
import PollCreationMatrix from "./Poll/Creation/PollCreationMatrix";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme();

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/poll/new" element={<PollCreationQuick />}></Route>
          <Route path="/poll/matrix" element={<PollCreationMatrix />}></Route>
          <Route path="/poll/:id" element={<PollView />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
