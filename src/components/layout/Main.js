import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from '../unprotected/Login';
import Register from '../unprotected/Register';
import Home from '../unprotected/Home';
import UsersRoutes from '../protected/users/user.routes';

import { Row, Col } from 'antd';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? <Component {...props} /> : <Redirect to="/users" />
      }
    />
  );
}

export default class Main extends Component {
  render() {
    const props = { ...this.props };
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={20}>
          <Switch>
            <Route path="/" exact component={Home} />
            <PublicRoute
              authed={props.authed}
              path="/login"
              component={Login}
            />
            <PublicRoute
              authed={props.authed}
              path="/register"
              component={Register}
            />
            <PrivateRoute
              authed={props.authed}
              path="/users"
              component={UsersRoutes}
            />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </Col>
      </Row>
    );
  }
}
