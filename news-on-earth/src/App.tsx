import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./views/Top"
import SearchPage from "./views/SearchPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/SearchPage`} element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;