import "./App.css";
import { Outlet } from "react-router-dom";
import NavbarMobile from "./components/Navbar/navbarMobile.js";
function App() {
  return (
    <div>
      <NavbarMobile />
      <Outlet />
    </div>
  );
}


export default App;