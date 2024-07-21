import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Navbar from "../../components/navbar/Navbar";
import HomeApp from "../../pages/home/HomeApp";
import ChatApp from "../../pages/chat/ChatApp";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  // navbar provider ?
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/chat/:chatId" element={<ChatApp />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
