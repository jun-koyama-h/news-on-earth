import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./views/Top"
import SearchPage from "./views/SearchPage"
import SearchResult from "./views/SearchResult"
import Test from './views/Test';
import Map from './views/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/SearchPage`} element={<SearchPage />} />
        <Route path={`/SearchResult`} element={<SearchResult />} />
        <Route path={`/Test`} element={<Test />} />
        <Route path={`/Map`} element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;