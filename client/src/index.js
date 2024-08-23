import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { thunk } from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SnackbarProvider autoHideDuration={2000} >
      <PersistGate loading={"loading"} persistor={persistor}>
        <GoogleOAuthProvider clientId="104287949834-7cdgk89u5koaql027u4ul3bqt1kj0039.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
    </PersistGate>
    </SnackbarProvider>
  </Provider>
);