import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd';
import { compose } from 'recompose';
import { connectAuth } from 'core';

import DefaultHeader from 'containers/DefaultLayout/DefaultHeader';


const { Content } = Layout;
class HomeContainer extends PureComponent {

  render () {
    const { menuId } = this.props.history.location.state;
    const { user } = this.props;
    return (
      <div className="home_wrapper">
        <DefaultHeader Type="home" menuId={menuId} />
        <Layout className="home_block">
          <Content className="main">
            <Row>
              <Col>
                <p>Current Username: {user.name}</p>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  user: PropTypes.object,
};

HomeContainer.defaultProps = {
  user: PropTypes.object,
}

const mapStateToProps = ({ auth, user }) => ({
  user: auth.user,
});

export default compose(
  connectAuth(mapStateToProps, undefined),
)(HomeContainer);