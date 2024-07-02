import { BrowserRouter, Route, Routes } from "react-router-dom";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  // navbar provider ?
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
