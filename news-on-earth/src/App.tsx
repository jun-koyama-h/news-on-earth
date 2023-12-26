import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./views/Top"
import SearchPage from "./views/SearchPage"
import Posts from './components/posts';
import Post from './components/post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path={`/SearchPage`} element={<SearchPage />} />
        <Route path="/posts/list" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;