import Login from "../../page/Login/Login"
import Personal from "../../page/Personal/Personal"
export const nav = [
     { path:     "/login",    name: "Login",        element: <Login />,       isMenu: true,     isPrivate: false  },
     { path:     "/personal", name: "Personal",       element: <Personal />,   isMenu: true,     isPrivate: true }
]