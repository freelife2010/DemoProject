import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connectAuth, authActionCreators } from 'core';
import { Icon, Layout, Row, Col } from 'antd';
import { promisify } from '../../utilities';
import enMessage from 'language/en.json';
import { config } from '../../config';


const { Content } = Layout;

class DefaultHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuId: 'profile',
    };
  }

  componentDidMount() {
    this.mounted = true;
    var touchzone = document.getElementById("root");
    touchzone.addEventListener("touchstart", e => {
      if (document.getElementById('header_bar') && document.getElementById('header_bar').contains(e.target)) {
        return;
      }
      if (this.mounted) {
        this.setState({ collapsed: false});
      }
    }, false);

    document.body.addEventListener('click', e => {
      if (document.getElementById('header_bar') && document.getElementById('header_bar').contains(e.target)) {
        return;
      }
      if (this.mounted) {
        this.setState({ collapsed: false, showNotifyList: false });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  
  toggleCollapsed = () => {
    const isCollapsed = this.state.collapsed;
    this.setState({
      collapsed: !isCollapsed,
    });
  }

  navigatePage = (e, menuId) => {
    this.setState({collapsed: false, menuId});
    const { user } = this.props;
    e.preventDefault();

    if(menuId === 'logout') {
      promisify(this.props.logOut, {
        user
      })
        .then(() => {
          this.props.history.push('/signin');
        })
        .catch(error => {
          console.log('error', error)
        });
    } else {
      this.props.history.push({
        pathname: `/${menuId}`,
        state: { menuId },
      });
    }
  }

  
  render() {
    const { Type, menuId } = this.props;
    return (
      <React.Fragment>
        {
          Type === 'home'
          && (
            <div className="header_content">
              <div id="header_bar" className="mobile_header">
                <Icon className="menu_bar" type="bars" onClick={this.toggleCollapsed} />
                {
                  this.state.collapsed ? (
                    <div className="collapse_menu_item">
                      {
                        config.menu.map((menuItem, index) => {
                          return (
                            <p key={index} onClick ={ e => this.navigatePage(e, menuItem.id) }>
                              {menuItem.title}
                            </p>
                          );
                        })
                      }
                    </div>) : null
                }
                <span className="home_header_title">
                  {enMessage['header.title']}
                </span>
              </div>
              <Content className="web_header">
                <Row>
                  <Col>
                    {
                      config.menu.map((menuItem, index) => {
                        return (
                          <span className={menuId === menuItem.id ? 'selected' : ''} key={index} onClick ={ e => this.navigatePage(e, menuItem.id) }>
                            {menuItem.title}
                          </span>
                        );
                      })
                    }
                  </Col>
                </Row>
              </Content>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  Type: PropTypes.string,
  menuId: PropTypes.string,
  logOut: PropTypes.func,
};

DefaultHeader.defaultProps = {
  history: PropTypes.object,
  user: PropTypes.object,
  Type: PropTypes.string,
  menuId: PropTypes.string,
  logOut: PropTypes.func,
};

const mapStateToProps = ({ auth, user }) => ({
  user: auth.user,
});

const mapDisptachToProps = dispatch => {
  const {
    logOut,
  } = authActionCreators;
  
  return bindActionCreators({
    logOut,
  }, dispatch);
};

export default compose(
  withRouter,
  connectAuth(mapStateToProps, mapDisptachToProps),
)(DefaultHeader);