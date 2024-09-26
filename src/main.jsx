import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from './app';
import store from './store/store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
    </BrowserRouter>
  </HelmetProvider>
);
