import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersTable from './users.table';
import UserDetails from './user.details';
import UserEdit from './user.edit';
import UserCreate from './user.create';

const UserRoutes = () => (
  <Switch>
    <Route exact path="/users" component={UsersTable} />
    <Route path="/users/view/:userId" component={UserDetails} />
    <Route path="/users/edit/:userId" component={UserEdit} />
    <Route path="/users/create" component={UserCreate} />
  </Switch>
);

export default UserRoutes;
