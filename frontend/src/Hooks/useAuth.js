import { useState, createContext, useContext } from 'react';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(userService.getUser());

    const login = async (email, password) => {
        try {
            const user = await userService.login(email, password);
            setUser(user);
            toast.success('Login Successful');
        } catch (err) {
            toast.error(err.response.data);
        }
    };


    const register = async (data) => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success('Register Successfully');
        } catch (err) {
            toast.error(err.response.data);
        }
    };



    const logout = () => {
        userService.logout();
        document.title = `Food Mine !`
        setUser(null);
        navigate("/");
        toast.success('Logout Successful');
    };

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);