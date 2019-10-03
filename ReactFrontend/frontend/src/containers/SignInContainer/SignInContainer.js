import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Row, Col, Form, Icon, Input, Button, Layout } from 'antd';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import enMessage from 'language/en.json';

const { Content } = Layout;
/**
 * User Signin Page
 */
class SignInContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  componentWillMount () {
    const { user } = this.props;
    if (user.name) {
      this.props.history.push({
        pathname: '/home',
        state: { menuId: 'home' },
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params;
        params = {
          username: values.username,
          password: values.password,
        };
        
        promisify(this.props.login, params)
          .then(() => {
            this.props.history.push({
              pathname: '/home',
              state: { menuId: 'home' },
            });
          })
          .catch(error => {
            this.setState({ msg: error.msg })
          });
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="signin_block">
        <Layout>
          <Content className="main">
            <Row>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Col sm={{span: 22, offset:1}} xs={{span: 22, offset:1}}>
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input type="text" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </Form.Item>
                </Col>
                <Col sm={{span: 22, offset:1}} xs={{span: 22, offset:1}} >
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </Form.Item>
                </Col>
                <Col className="center login_btn_area" sm={{span: 22, offset:1}} xs={{span: 22, offset:1}}>
                  <p className="invalid_msg">{this.state.msg}</p>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      {enMessage['login.btn.title']}
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }  
}

SignInContainer.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
};

SignInContainer.defaultProps = {
  history: PropTypes.object,
  login: PropTypes.func,
}

const mapStateToProps = ({auth}) => ({
  user: auth.user
});
const mapDisptachToProps = (dispatch) => {
  const {
    login
  } = authActionCreators;

  return bindActionCreators({
    login
  }, dispatch);
}
export default compose(
  Form.create({ name: 'normal_login' }),
  connectAuth(mapStateToProps, mapDisptachToProps)
)(SignInContainer);