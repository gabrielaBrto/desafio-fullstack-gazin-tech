import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

    return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GAZIN TECH
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, display: 'block' }}
                onClick={() => { history.push(`/desenvolvedores/`); }}
              >
                Desenvolvedores
              </Button>
              <Button
                sx={{ my: 2, display: 'block' }}
                onClick={() => { history.push(`/niveis/`); }}
              >
                Níveis
              </Button>
          </Box>

        </Toolbar>
      </AppBar>
    );
};

export default Header;
