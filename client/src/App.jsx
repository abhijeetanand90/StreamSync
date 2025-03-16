import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import Home from "./component/Home";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
