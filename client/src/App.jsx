import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./component/auth/Signup";
import Login from "./component/auth/Login";
import Home from "./component/Home";
import WithNav from "./component/WithNav";
import PrivateRoute from "./component/ProtectedRoute/ProtectedRoute";
import { selectCurrentToken } from "./redux/features/auth";
import { useSelector } from "react-redux";

function App() {
  

  const isAuthenticated=useSelector(selectCurrentToken);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
          </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
