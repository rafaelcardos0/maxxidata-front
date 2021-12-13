import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../AuthProvider';
import Cookies from 'js-cookie';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';


export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  
  const [openAlert, setOpenAlert] = useState(false);
  
  const defaultPage = '/usuario';
  const from = location.state?.from?.pathname || defaultPage;

  useEffect(() => {
    let token = Cookies.get('token');
    if (token) {
      navigate(defaultPage, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    auth.login({
      username: data.get('username'),
      password: data.get('password'),
      onSuccess: (access_token) => {
        Cookies.set('token', access_token);
        navigate(from, { replace: true });
      },
      onError: () => {
        setOpenAlert(true);
      }
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  return (
    <Grid container spacing={2} alignItems='center' style={{minHeight: '100vh', backgroundColor: '#0D0C4B'}}>
      <Snackbar open={openAlert} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000}>
        <Alert severity='error' sx={{ width: '100%' }}>{t('Credenciais inválidas.')}</Alert>
      </Snackbar>
      <Grid item xs={6}>
        <Container maxWidth='s'>
          <Logo alt='Maxxidata' />
          <Typography sx={{ mt: 5, textAlign: 'center' }} color='#fff'>
            <Trans>Projeto <a href='https://github.com/Maxxidata/fullstack-challenge/blob/master/README.md' style={{color: '#fff'}}>FullStack Challenge</a> desenvolvido por <b>Rafael Cardoso Coelho</b>.</Trans>
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={6} style={{backgroundColor: '#fff'}}>
        <Container component='main' maxWidth='xs'>
          <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>Login</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin='normal' required fullWidth id='usuario' label={t('Usuário')} name='username' autoFocus />
              <TextField margin='normal' required fullWidth name='password' label={t('Senha')} type='password' id='password' />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>{t('Entrar')}</Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}