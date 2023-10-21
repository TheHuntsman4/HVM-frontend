import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages";
import {Mainform} from'./pages/Form.tsx';
// import { FormComponent } from "./components";
import FormStuff from "./components/formComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Mainform />} />
        <Route path="/test" element={<FormStuff/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
