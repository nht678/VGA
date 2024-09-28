/* eslint-disable perfectionist/sort-imports */
import 'bootstrap/dist/css/bootstrap.min.css';

import 'src/global.css';
import './index.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
