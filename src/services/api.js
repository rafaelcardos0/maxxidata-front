import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(
    (config) => {
        // Envia o token da sessão salvo no cookie
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Apaga o cookie de sessão quando o usuário tenta acessar uma página que não possui permissão
        if (error.response.status === 401) {
            Cookies.remove('token');
        }
        return Promise.reject(error);
    }
)

export default api;