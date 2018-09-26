import React, { Component } from 'react';

import { Breadcrumb, Row, Col, Card } from 'antd';

export default class BreadcrumbCmp extends Component {
  renderCrumbs() {
    return this.props.currentNavPath.map(bcrumb => (
      <Breadcrumb.Item key={bcrumb}>{bcrumb}</Breadcrumb.Item>
    ));
  }

  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={20}>
          <Card
            bordered={false}
            bodyStyle={{ paddingLeft: '0', background: 'none' }}
            style={{ background: 'none' }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              {this.renderCrumbs()}
            </Breadcrumb>
          </Card>
        </Col>
      </Row>
    );
  }
}
