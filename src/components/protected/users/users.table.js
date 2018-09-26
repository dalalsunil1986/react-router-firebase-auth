import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get, deleteResource } from '../../../helpers/api';

import { Table, Divider, Spin, Button, Avatar, Modal } from 'antd';

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
      error: null,
      visible: false,
      userToDelete: null
    };
  }

  showModal = e => {
    e.preventDefault();
    this.setState({
      userToDelete: e.target.id,
      visible: true
    });
  };

  handleDelete = e => {
    e.preventDefault();
    deleteResource('users', this.state.userToDelete).then(() => {
      // Filter out the user to delete
      const newUsers = this.state.users.filter(
        user => user.id !== this.state.userToDelete
      );

      this.setState({
        users: newUsers,
        visible: false,
        userToDelete: null
      });
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    get('users')
      .then(data => this.setState({ users: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { users, isLoading, error } = this.state;
    const columns = [
      {
        title: '',
        key: 'avatar',
        render: () => <Avatar icon="user" />
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (username, user) => (
          <Link to={`/users/view/${user.id}`}>{username}</Link>
        )
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Address',
        dataIndex: '',
        key: 'address',
        render: user =>
          user.address && (
            <span>
              {user.address.city || ''}, {user.address.zipcode || ''}
            </span>
          )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, user) => (
          <span>
            <Link to={`/users/edit/${user.id}`}>Edit</Link>
            <Divider type="vertical" />
            <Button onClick={this.showModal} id={user.id} type="danger">
              Delete
            </Button>
          </span>
        )
      }
    ];

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
        <Link to={`/users/create/`}>Create User</Link>
        <Divider dashed />
        <Table columns={columns} dataSource={users} bordered />
        <Modal
          title="Delete User"
          visible={this.state.visible}
          onOk={this.handleDelete}
          onCancel={this.handleCancel}
        >
          <p>Are you sure you want to delete the User</p>
        </Modal>
      </div>
    );
  }
}
