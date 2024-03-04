import { Outlet } from "react-router-dom";
import NavbarMobile from "../components/Navbar/navbarMobile"
export default function Root() {
    return (
        <>
            <NavbarMobile />
            <Outlet />
        </>
    );
  }