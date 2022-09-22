import Header from "./Header/Header";
import Poll from "./Poll/Poll";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/poll/:id" element={<Poll />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
