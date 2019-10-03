import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connectAuth } from 'core';

class PrivateRoute extends Component {
  render () {
    const { user, ...props } = this.props;

    if (user && user.name === 'Admin') {
      return (
        <Route {...props}/>
      );
    } else {
      return (
        <Redirect to="/login"/>
      );
    }
  }
}
const mapStateToProps = ({auth}) => ({
  user: auth.user
});
export default connectAuth(mapStateToProps, {})(PrivateRoute);