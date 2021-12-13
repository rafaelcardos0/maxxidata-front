import React, { useState, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(Cookies.get('token'));

    const login = (options) => {
        let { username, password, onSuccess, onError } = options;
        
        return api.post('/auth/login', { username, password })
            .then(response => {
                setUser(response.data.access_token);
                if (onSuccess) {
                    onSuccess(response.data.access_token);
                }
            })
            .catch(error => {
                if (onError) {
                    onError();
                }
            });
    }

    const logout = (cb) => {
        console.log('DESLOGANDO...');
        Cookies.remove('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => (useContext(AuthContext));