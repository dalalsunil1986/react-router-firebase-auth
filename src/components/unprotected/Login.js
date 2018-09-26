import React, { Component } from 'react';
import { login, resetPassword } from '../../helpers/auth';

import { Form, Icon, Input, Button, Row, Col, message } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values.email, values.password).catch(e => {
          message.error(e.message);
        });
      }
    });
  };

  resetPassword = () => {
    const { getFieldValue } = this.props.form;

    resetPassword(getFieldValue('email'))
      .then(() => {
        message.success(
          `Password reset email sent to ${getFieldValue('email')}.`
        );
      })
      .catch(e => message.error(e.message));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Col span={12}>
          <h1>Login</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input a valid email!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>{' '}
              <a onClick={this.resetPassword}>Forgot password</a>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(NormalLoginForm);
