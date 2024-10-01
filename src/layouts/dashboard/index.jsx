import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Footer from 'src/sections/footer/footer';

import Nav from './nav';
import Main from './main';
// import Header from './header';
import Header from '../../pages/header';
// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      {/* <Header onOpenNav={() => setOpenNav(true)} /> */}
      <Header />


      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main sx={{ pt: 0 }}>{children}</Main>
      </Box>
      <Footer />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
