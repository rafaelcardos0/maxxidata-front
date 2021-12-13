import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/user/UserList';
import LoginPage from './components/login/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './components/AuthProvider';
import ProfessionalList from './components/professional/ProfessionalList';
import ProfessionalTypeList from './components/professional-type/ProfessionalTypeList';
import ProfessionalTypeForm from './components/professional-type/ProfessionalTypeForm';
import UserForm from './components/user/UserForm';
import ProfessionalForm from './components/professional/ProfessionalForm';
import UserFormEdit from './components/user/UserFormEdit';
import ProfessionalTypeFormEdit from './components/professional-type/ProfessionalTypeFormEdit';
import ProfessionalFormEdit from './components/professional/ProfessionalFormEdit';
import HomePage from './components/layout/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D0C4B',
      darker: '#053e85',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/usuario' element={<UserList />} />
              <Route path='/usuario/novo' element={<UserForm />} />
              <Route path='/usuario/:id' element={<UserFormEdit disabled />} />
              <Route path='/usuario/:id/editar' element={<UserFormEdit />} />
              <Route path='/profissional' element={<ProfessionalList />} />
              <Route path='/profissional/novo' element={<ProfessionalForm />} />
              <Route path='/profissional/:id' element={<ProfessionalFormEdit disabled />} />
              <Route path='/profissional/:id/editar' element={<ProfessionalFormEdit />} />
              <Route path='/tipo-de-profissional' element={<ProfessionalTypeList />} />
              <Route path='/tipo-de-profissional/novo' element={<ProfessionalTypeForm />} />
              <Route path='/tipo-de-profissional/:id' element={<ProfessionalTypeFormEdit disabled />} />
              <Route path='/tipo-de-profissional/:id/editar' element={<ProfessionalTypeFormEdit />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;