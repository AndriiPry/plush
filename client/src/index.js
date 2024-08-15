import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
    <GoogleOAuthProvider clientId="863932158830-tjbu9gcpos7i812t5ive5rah4iehq2if.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);