import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import BookView from './components/books';
import Layout from './hoc/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/books/:id" component={BookView} />
      </Switch>
    </Layout>
  );
};

export default Routes;
