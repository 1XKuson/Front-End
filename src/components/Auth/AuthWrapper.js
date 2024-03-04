import { createContext, useContext, useState } from "react";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState({ name: "", isAuthenticated: false });
    const cookies = new Cookies();

    const login = async (userName, password) => {
        try {
            const response = await api.post('/accounts/login', {
                Email: userName,
                Password: password,
            });
            const token = response.data.token;
            // Assuming the response indicates successful authentication
            if (response.data && response.data.token) {
                const decodedToken = jwtDecode(token);
                const ProfessorID = decodedToken.ProfessorID;
                const Email  = decodedToken.email;
                const UsesrID = decodedToken.usesrID;
                const expToken = decodedToken.exp;
                const FirstNameTH = decodedToken.FirstNameTH;
                cookies.set("token",token);
                cookies.set("ProfessorID", ProfessorID);
                cookies.set("Email", Email);
                cookies.set("userID", UsesrID);
                cookies.set("expToken", expToken);
                cookies.set("FirstNameTH", FirstNameTH);

                setUser({ name: userName, isAuthenticated: true });

                return "success"; // Resolve the promise indicating successful login
            } else {
                throw new Error("Authentication failed. Invalid token.");
            }
        } catch (error) {
            throw error; // Throw the error if login fails
        }
    };

    const logout = () => {
        setUser({ ...user, isAuthenticated: false });
        cookies.remove("token");
        cookies.remove("ProfessorID");
        cookies.remove("Email");
        cookies.remove("userID");
        cookies.remove("expToken");
        cookies.remove("FirstNameTH");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthWrapper;
