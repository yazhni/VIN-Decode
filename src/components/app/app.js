import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../containers/home';
import Layout from '../layout';
import Header from '../header';
import ErrorBoundary from '../error-boundry';
import Login from "../../containers/Login";
import Vin from "../../containers/vinResponse"
const UnAuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
 const loginUser =localStorage.getItem('x-auth-token');
const App = () => (
  <ErrorBoundary>
    <Router>
      <Header />
      <Layout>
        <Switch>
          <AuthRoute path="/" authUser={loginUser} exact component={Home} />
          <UnAuthRoute path="/login" authUser={loginUser} component={Login}/>
          <AuthRoute path="/VinRequest" authUser={loginUser} exact component={Vin} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  </ErrorBoundary>
)

export default App