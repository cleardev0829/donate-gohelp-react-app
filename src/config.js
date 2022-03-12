export const firebaseConfig = {
  apiKey: "AIzaSyBdN-wBBEFtf_xmC6X-a_gEEq56orqxRCY",
  authDomain: "gohelpdao1.firebaseapp.com",
  projectId: "gohelpdao1",
  storageBucket: "gohelpdao1.appspot.com",
  messagingSenderId: "695315569461",
  appId: "1:695315569461:web:c932111ec0434b4df24a7c",
  measurementId: "G-246N5JN6FX",
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;
export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
