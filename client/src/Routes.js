import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import BookView from './components/books';
import Layout from './hoc/Layout';
import Login from './containers/admin/Login';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/books/:id" component={BookView} />
      </Switch>
    </Layout>
  );
};

export default Routes;
