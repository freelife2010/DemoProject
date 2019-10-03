import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInContainer from 'containers/SignInContainer/SignInContainer';
import HomeContainer from 'containers/HomeContainer/HomeContainer/HomeContainer';
import ContactsContainer from 'containers/HomeContainer/ContactsContainer/ContactsContainer';
import ProfileContainer from 'containers/HomeContainer/ProfileContainer/ProfileContainer';

class RoutesContainer extends PureComponent {
  render () {
    return (
      <Switch>
        <Route exact path="/home" component={HomeContainer}/>
        <Route exact path="/contacts" component={ContactsContainer}/>
        <Route exact path="/profile" component={ProfileContainer}/>
        <Route path="/" component={SignInContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;