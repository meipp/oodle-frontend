import Header from "./Header/Header";
import PollView from "./Poll/PollView";
import PollCreation from "./Poll/PollCreation";
import MatrixCreation from "./PollCreation/Matrix";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/poll/new" element={<PollCreation />}></Route>
          <Route path="/poll/matrix" element={<MatrixCreation />}></Route>
          <Route path="/poll/:id" element={<PollView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
