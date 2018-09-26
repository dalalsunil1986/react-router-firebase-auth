import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { edit, getOne } from '../../../helpers/api';
import { Form, Input, Spin, Button, Divider, Tooltip, Icon } from 'antd';

const FormItem = Form.Item;

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: true,
      error: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        edit('users', values, this.props.match.params.userId).then(() => {
          this.props.history.push('/users');
        });
      }
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const {
      match: { params }
    } = this.props;

    getOne('users', params.userId)
      .then(user => this.setState({ user, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, isLoading, error } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div>
        <h1>Edit User</h1>
        <Divider dashed />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem {...formItemLayout} label="id">
            <span className="ant-form-text">{user.id}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                {
                  required: true,
                  message: 'Please input your Username!'
                }
              ]
            })(<Input placeholder="Username" />)}
          </FormItem>
          <FormItem label="Name" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: user.name,
              rules: [
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]
            })(<Input placeholder="Name" />)}
          </FormItem>
          <FormItem label="Email" {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                {
                  type: 'email',
                  required: true,
                  message: 'Please input a valid Email!'
                }
              ]
            })(<Input placeholder="Email" />)}
          </FormItem>
          <FormItem label="Phone" {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [{ message: 'Please input your Phone Number!' }]
            })(<Input placeholder="Phone" />)}
          </FormItem>
          <FormItem label="Website" {...formItemLayout}>
            {getFieldDecorator('website', {
              initialValue: user.website,
              rules: [
                {
                  type: 'url',
                  message: 'Please input a valid website!'
                }
              ]
            })(<Input placeholder="Website" />)}
          </FormItem>
          <FormItem label="Company Name" {...formItemLayout}>
            {getFieldDecorator('company.name', {
              initialValue: user.company ? user.company.name : '',
              rules: [
                {
                  message: 'Please input your company name!'
                }
              ]
            })(<Input placeholder="Company Name" />)}
          </FormItem>
          <FormItem label="Company Catch Phrase" {...formItemLayout}>
            {getFieldDecorator('company.catchPhrase', {
              initialValue: user.company ? user.company.catchPhrase : '',
              rules: [
                {
                  message: 'Please input your company catch phrase!'
                }
              ]
            })(<Input placeholder="Company Catch Phrase" />)}
          </FormItem>
          <FormItem label="Company Bs" {...formItemLayout}>
            {getFieldDecorator('company.bs', {
              initialValue: user.company ? user.company.bs : '',
              rules: [
                {
                  message: 'Please input your company bs!'
                }
              ]
            })(<Input placeholder="Company bs" />)}
          </FormItem>
          <FormItem label="Address Street" {...formItemLayout}>
            {getFieldDecorator('address.street', {
              initialValue: user.address ? user.address.street : '',
              rules: [
                {
                  message: 'Please input a valid address street!'
                }
              ]
            })(<Input placeholder="Street" />)}
          </FormItem>
          <FormItem label="Address Suite" {...formItemLayout}>
            {getFieldDecorator('address.suite', {
              initialValue: user.address ? user.address.suite : '',
              rules: [
                {
                  message: 'Please input a valid address suite!'
                }
              ]
            })(<Input placeholder="Suite" />)}
          </FormItem>
          <FormItem label="Address City" {...formItemLayout}>
            {getFieldDecorator('address.city', {
              initialValue: user.address ? user.address.city : '',
              rules: [
                {
                  message: 'Please input a valid address city!'
                }
              ]
            })(<Input placeholder="City" />)}
          </FormItem>
          <FormItem label="Address ZipCode" {...formItemLayout}>
            {getFieldDecorator('address.zipcode', {
              initialValue: user.address ? user.address.zipcode : '',
              rules: [
                {
                  message: 'Please input a valid address ZipCode!'
                }
              ]
            })(<Input placeholder="Zipcode" />)}
          </FormItem>
          <FormItem label="Address Geo Lat" {...formItemLayout}>
            {getFieldDecorator('address.geo.lat', {
              initialValue: user.address ? user.address.geo.lat : '',
              rules: [
                {
                  message: 'Please input a valid address latitude!'
                }
              ]
            })(<Input placeholder="Latitude" />)}
          </FormItem>
          <FormItem label="Address Geo Lat" {...formItemLayout}>
            {getFieldDecorator('address.geo.lng', {
              initialValue: user.address ? user.address.geo.lng : '',
              rules: [
                {
                  message: 'Please input a valid address longitude!'
                }
              ]
            })(<Input placeholder="Longitude" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Divider type="vertical" />
            <Link to="/users">Cancel</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(UserEdit);
