import Header from "./Header/Header";
import PollView from "./Poll/PollView";
import PollCreation from "./Poll/PollCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/poll/new" element={<PollCreation />}></Route>
          <Route path="/poll/:id" element={<PollView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
