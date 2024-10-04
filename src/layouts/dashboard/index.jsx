import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Footer from 'src/sections/footer/footer';
import Grid from '@mui/system/Grid';

import Nav from './nav';
import Main from './main';
// import Header from './header';
import Header from '../../pages/header';
// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box>
      <Header />
      <Box sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          {/* <Header onOpenNav={() => setOpenNav(true)} /> */}

          <Grid size={{ md: 2 }}>
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
          </Grid>

          <Grid size={{ md: 10 }}>
            <Main sx={{ width: '100%', pt: 0 }}>{children}</Main>
          </Grid>

        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
