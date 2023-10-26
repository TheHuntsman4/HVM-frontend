import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, PrintPDF, Register, Home } from "./pages";
import { Mainform } from "./pages/Form.tsx";
// import { FormComponent } from "./components";
import AccompanyingForm from "./pages/accompanyingForm";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element=
        {
          <>
            <Navbar />
            <Home />
          </>
        }/>
        <Route
          path="/leadform"
          element={
            <>
              <Navbar />
              <Mainform />
            </>
          }
        />
        <Route path="/accompanyingform" element={<AccompanyingForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/print" element={<PrintPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
