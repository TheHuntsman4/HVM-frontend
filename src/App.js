import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, PrintPDF, Register, Home, Navigate } from "./pages";
import { Mainform } from "./pages/Form.tsx";
// import { FormComponent } from "./components";
import AccompanyingForm from "./pages/accompanyingForm";
import Navbar from "./components/navbar";
import Auth from "./services/checkAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/navigate" element={<Navigate/>}/>
        <Route
          path="/home"
          element={
            <>
              <Auth />
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/leadform"
          element={
            <>
              <Auth />
              <Navbar />
              <Mainform />
            </>
          }
        />
        <Route
          path="/accompanyingform"
          element={
            <>
              <Auth />
              <AccompanyingForm />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Auth />
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/print"
          element={
            <>
              <Auth />
              <Navbar/>
              <PrintPDF />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
