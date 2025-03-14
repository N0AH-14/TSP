import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/stores/eventStore.js'; // Ensure the correct path to your store

// Access environment variables or use hardcoded values as needed
const domain = "dev-takeyourticket.us.auth0.com"; // Consider loading this from environment variables
const clientId = "W4YcDoFwXNQm8clbm2Dmf6a2AtKraAK4"; // Consider loading this from environment variables
const audience = "http://localhost:5000"; // Your API identifier

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Ensure Provider wraps everything */}
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin, // Redirect URL after authentication
          audience: audience, // API identifier
          scope: "openid profile email", // Scopes for user info
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);