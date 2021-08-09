import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { isAuthenticated } from "./auth";
import store from "./store";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Carregando...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Home = React.lazy(() => import("./views/Pages/Home"));
const Login = React.lazy(() => import("./views/Pages/Login"));
const Logout = React.lazy(() => import("./views/Pages/Logout"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const ResetPassword = React.lazy(() => import("./views/Pages/ResetPassword"));
const ForgotPassword = React.lazy(() => import("./views/Pages/ForgotPassword"));
const RegistroVisita = React.lazy(() => import("./views/Pages/RegistroVisita"));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location,
              message: "Usuário não autorizado.",
            },
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route
                  exact
                  path="/"
                  name="Home"
                  render={(props) => <Home {...props} />}
                />
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path="/logout"
                  name="Login Page"
                  render={(props) => <Logout {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  name="Page 404"
                  render={(props) => <Page404 {...props} />}
                />{" "}
                v
                <Route
                  exact
                  path="/resetpassword"
                  name="Reset Password"
                  render={(props) => <ResetPassword {...props} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  name="Forgot Password"
                  render={(props) => <ForgotPassword {...props} />}
                />
                <Route
                  exact
                  path="/registrovisita"
                  name="Registro de Visita"
                  render={(props) => <RegistroVisita {...props} />}
                />
                <PrivateRoute
                  path="/console"
                  name="Console"
                  component={DefaultLayout}
                />
                <Route render={(props) => <Page404 {...props} />} />
              </Switch>
            </React.Suspense>
          </HashRouter>
        </Provider>
      </>
    );
  }
}

export default App;
