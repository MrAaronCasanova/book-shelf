import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import BookView from './components/books';
import Login from './containers/admin/Login';
import User from './components/admin';
import AddBook from './containers/admin/AddBook';
import UserPosts from './components/admin/UserPosts';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/user" component={Auth(User, true)} />
        <Route exact path="/user/add" component={Auth(AddBook, true)} />
        <Route exact path="/books/:id" component={Auth(BookView, null)} />
        <Route exact path="/user-reviews" component={Auth(UserPosts, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
