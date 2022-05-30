import 'bootstrap/dist/css/bootstrap.css';

// Exporting a react component
// Going to receive a props object that has two properties, Component and pageProps

// Whenever you try to navigate to a page with NextJS, 
// it will import the component from relevant file in the pages folder
// It wraps it in its own custom default component (_app)

// So we are extending that default component with global CSS for example
// This way, every page will now Bootstrap
export default ({Component, pageProps}) => {
  return <Component {...pageProps} />
};