import React, { Component } from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

export default class FooterCmp extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>Hightower Design ©2018</Footer>
    );
  }
}
