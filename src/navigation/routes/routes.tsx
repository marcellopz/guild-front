import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Navbar from "../../components/navbar/Navbar";
import HomeApp from "../../pages/home/HomeApp";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  // navbar provider ?
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
