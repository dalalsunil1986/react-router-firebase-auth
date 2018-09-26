import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { firebaseAuth } from '../config/constants';

import Nav from './layout/Nav';
import Main from './layout/Main';
import FooterCmp from './layout/Footer';
import BreadcrumbCmp from './layout/Breadcrumb';

import { Layout, Spin } from 'antd';

const { Header, Content } = Layout;

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    currentNavPath: []
  };

  handleClick = e => {
    this.setState({
      currentNavPath: e.keyPath
    });
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          currentNavPath: ['users']
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          currentNavPath: ['login']
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const pageContent =
      this.state.loading === true ? (
        <div
          style={{
            position: 'relative',
            padding: '20% 50%',
            minHeight: '100%'
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <BreadcrumbCmp currentNavPath={this.state.currentNavPath} />
          <Main authed={this.state.authed} />
        </div>
      );

    return (
      <BrowserRouter>
        <Layout>
          <Header>
            <div className="logo" />
            <Nav
              authed={this.state.authed}
              handleClick={this.handleClick}
              currentNavPath={this.state.currentNavPath}
            />
          </Header>
          <Content>{pageContent}</Content>
          <FooterCmp />
        </Layout>
      </BrowserRouter>
    );
  }
}
