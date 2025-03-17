import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function WithNav() {
  return (
    <div>
    <Navbar />
    <Outlet />

    </div>
  )
}
