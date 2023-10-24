import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, PrintPDF, Register } from "./pages";
import {Mainform} from'./pages/Form.tsx';
// import { FormComponent } from "./components";
import AccompanyingForm from "./components/formComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/leadform" element={<Mainform />} />
        <Route path="/accompanyingform" element={<AccompanyingForm/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/print" element={<PrintPDF/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
