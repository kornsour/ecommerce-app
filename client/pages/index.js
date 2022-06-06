// Flow:
// 
// Request to client (Next JS) at ticketing.dev
//
// Inspect URL of incoming request. Determine set of components to show
// Call those components 'getInitialProps' static method
// Render each component with data from 'getInitialProps' one time
// Assemble HTML from all components, send back response

// Request from a component
  // Always issued from the browser, so use a domain of ''
// Request from getInitialProps
  // Might be executed from the client or the server
  // Need to figure out what our env is so we can use the correct domain

// getInitialProps executed on the server if:
  // Hard refresh on the page
  // Clicking link from different domain
  // Typing URL into address bar
// getInitialProps executed on the client
  // Navigating from one page to another while in the app

// Why not use 'use-request'?
// Hooks only work with components
// getInitialProps is a regular function
import buildClient from "../api/build-client";

// Any data from the getInitialProps function will show up in this component
// Not allowed to fetch data from inside a component during server side rendering process
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1> 
  ) : (
    <h1>You are NOT signed in</h1>
  );
};
  
// Going to be executed during the server side rendering process
// This function is where we're going to fetch data for the initial rendering of our app
LandingPage.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;