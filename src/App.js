import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Mainform } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Mainform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
