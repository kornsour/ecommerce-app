import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// Exporting a react component
// Going to receive a props object that has two properties, Component and pageProps

// Whenever you try to navigate to a page with NextJS, 
// it will import the component from relevant file in the pages folder
// It wraps it in its own custom default component (_app)

// So we are extending that default component with global CSS for example
// This way, every page will now Bootstrap
const AppComponent = ({Component, pageProps, currentUser}) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(data);

  return {
    pageProps,
    // same as `currentUser: data.currentUser`
    ...data
  }
};

export default AppComponent;