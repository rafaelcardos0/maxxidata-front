import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/images/logo-white.svg';
import { useAuth } from '../AuthProvider';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    {title: t('Profissionais'), url: '/profissional' },
    {title: t('Tipos de Profissional'), url: '/tipo-de-profissional' },
    {title: t('Usuários'), url: '/usuario' }
  ];
  const settings = [
    {title: t('Sair'), onClick: auth.logout}
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1}}>
            <Link to="/">
              <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                <img src={logo} alt='Maxxidata' />
              </Typography>
            </Link>
          </Box>

          <MenuNavMobile pages={pages} />
          <MenuNav pages={pages} />
          <LanguageSelector />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t('Opções')}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: '30px' }}>
                <Avatar alt='Maxxidata' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title}>
                  <Typography onClick={setting.onClick} textAlign='center'>{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

const MenuNav = ({ pages }) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button key={page.url} component={Link} to={page.url} sx={{ my: 2, color: 'white', display: 'block' }}>
          {page.title}
        </Button>
      ))}
    </Box>
  )
}

const MenuNavMobile = ({ pages }) => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton onClick={handleOpenNavMenu} size='large' aria-controls='menu-appbar' aria-haspopup='true' color='inherit'>
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {pages.map((page) => (
            <MenuItem key={page.url} onClick={handleCloseNavMenu}>
              <Typography textAlign='center'>{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Link to="/">
        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textAlign: 'center' }}>
          <img src={logo} style={{height: 25}} alt='Maxxidata' />
        </Typography>
      </Link>
    </>
  )
}