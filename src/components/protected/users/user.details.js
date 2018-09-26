import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getOne } from '../../../helpers/api';
import { Spin, Divider, List, Avatar } from 'antd';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: true,
      error: null
    };
  }

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
    const { user, isLoading, error } = this.state;

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
        <h1>User Details</h1>
        <Divider dashed />
        <List
          size="large"
          header={<div>User Info</div>}
          bordered
          dataSource={[user]}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.username}
                description={item.email}
                avatar={<Avatar icon="user" />}
              />
              <div>
                {item.name && (
                  <div>
                    <b>Name </b>
                    {item.name}
                  </div>
                )}
                {item.phone && (
                  <div>
                    <Divider />
                    <b>Phone </b>
                    {item.phone}
                  </div>
                )}
                {item.website && (
                  <div>
                    <Divider />
                    <b>Website </b>
                    {item.website}
                  </div>
                )}
                {item.company && (
                  <div>
                    <Divider />
                    <b>Company </b>
                    {item.company.name && (
                      <div>
                        <b>Name </b>
                        {item.company.name}
                      </div>
                    )}
                    {item.company.catchPhrase && (
                      <div>
                        <b>Catch Phrase </b>
                        {item.company.catchPhrase}
                      </div>
                    )}
                    {item.company.bs && (
                      <div>
                        <b>bs </b>
                        {item.company.bs}
                      </div>
                    )}
                  </div>
                )}
                {item.address && (
                  <div>
                    <Divider />
                    <b>Address </b>
                    <br />
                    {item.address.street && (
                      <div>
                        <b>Street </b>
                        {item.address.street}
                      </div>
                    )}
                    {item.address.suite && (
                      <div>
                        <b>Suite </b>
                        {item.address.suite}
                      </div>
                    )}
                    {item.address.city && (
                      <div>
                        <b>City </b>
                        {item.address.city}
                      </div>
                    )}
                    {item.address.zipcode && (
                      <div>
                        <b>Zip </b>
                        {item.address.zipcode}
                      </div>
                    )}
                    {item.address.geo && (
                      <div>
                        <b>Lat </b>
                        {item.address.geo.lat}
                      </div>
                    )}
                    {item.address.geo && (
                      <div>
                        <b>Lng </b>
                        {item.address.geo.lng}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <Link to={`/users/edit/${this.props.match.params.userId}`}>Edit</Link>
        <Divider type="vertical" />
        <Link to="/users">Back</Link>
      </div>
    );
  }
}
