import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';
import { compose } from 'recompose';
import { connectAuth } from 'core';

import DefaultHeader from 'containers/DefaultLayout/DefaultHeader';


const { Content } = Layout;
class ProfileContainer extends PureComponent {

  render () {
    const { menuId } = this.props.history.location.state;
    return (
      <div className="profile_wrapper">
        <DefaultHeader Type="home" menuId={menuId} />
        <Layout className="profile_block">
          <Content className="main">
            <Row>
              <Col>
                <p>Profile</p>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  user: PropTypes.object,
};

ProfileContainer.defaultProps = {
  user: PropTypes.object,
}

const mapStateToProps = ({ auth, user }) => ({
  user: auth.user,
});

export default compose(
  connectAuth(mapStateToProps, undefined),
)(ProfileContainer);