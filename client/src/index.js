import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { thunk } from 'redux-thunk';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SnackbarProvider autoHideDuration={2000} >
      <PersistGate loading={"loading"} persistor={persistor}>
        <App />
    </PersistGate>
    </SnackbarProvider>
  </Provider>
);