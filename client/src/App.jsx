import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import Home from "./component/Home";
import WithNav from "./component/WithNav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
