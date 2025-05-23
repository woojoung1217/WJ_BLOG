import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Daily from "./pages/Daily";
import Dev from "./pages/Dev";
import DevWrite from "./pages/DevWrite";
import PostDetail from "./pages/PostDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/dev/write" element={<DevWrite />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
