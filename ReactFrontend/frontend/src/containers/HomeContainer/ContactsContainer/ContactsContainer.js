import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Drawer, Layout, Table, Icon, Button, Tooltip, Input, Tabs } from 'antd';
import { connectAuth, connectContacts, contactsActionCreators } from 'core';
import { promisify } from 'utilities';
import DefaultHeader from 'containers/DefaultLayout/DefaultHeader';

const { Content } = Layout;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const tags = ['HOST', 'ADMIN', 'TAG 3'];
const { TabPane } = Tabs;
class ContactsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentWillMount() {
    promisify(this.props.getContacts, {})
      .then(() => {
      })
      .catch(error => {
        console.log('error', error)
      });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render () {
    const { menuId } = this.props.history.location.state;
    const { user, contactList } = this.props;
    return (
      <div className="contracts_wrapper">
        <DefaultHeader Type="home" menuId={menuId} />
        <Layout className="contracts_block">
          <Content className="main">
            <Table columns={columns} dataSource={data}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {this.showDrawer()}
                };
              }}
            />
          </Content>
          <Drawer
            className="side_panel"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            width={351}
          >
            <div className="profile_wrapper">
              <div className="avatar">AT</div>
              <p className="name">{user.name}</p>
              <div className="tag_list">
                {
                  tags.map((tag, index) => (
                    <div className="tag_item" key={index}>
                      {tag}
                      <Icon type="close" />
                    </div>
                  ))
                }
                <div className="add_btn">
                  <Tooltip placement="bottomRight" title={<Input placeholder="Type tag" />} trigger="click">
                    <Button><Icon type="plus" /></Button>
                  </Tooltip>
                </div>
              </div>
              <div className="contacts_list">
                {
                  contactList && contactList.map((contact, index) => (
                    <div key={index}>{contact.name}</div>
                  ))
                }
              </div>
            </div>
            <div className="main_info_wrapper">
              <Tabs type="card">
                <TabPane tab="Main Info" key="1">
                  <div>
                    <div>
                      <p className="title">PHONE</p>
                      <p className="description">+1 073 2714 007</p>
                    </div>
                    <div>
                      <p className="title">IP ADDRESS</p>
                      <p className="description">123123123432322</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="title">COUNTRY</p>
                      <p className="description">USA</p>
                    </div>
                    <div>
                      <p className="title">TIME ON WEBINAR</p>
                      <p className="description">1 hr</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="title">LTV</p>
                      <p className="description">$50</p>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="History" key="2">
                  <p>History</p>
                </TabPane>
                <TabPane tab="Messages 2" key="3">
                  <p>Messages 2</p>
                </TabPane>
              </Tabs>
            </div>
          </Drawer>
        </Layout>
      </div>
    );
  }
}

ContactsContainer.propTypes = {
  user: PropTypes.object,
  contactList: PropTypes.array
};

ContactsContainer.defaultProps = {
  user: PropTypes.object,
  contactList: []
}

const mapStateToProps = ({ auth, contacts }) => ({
  user: auth.user,
  contactList: contacts.list || []
});

const mapDisptachToProps = (dispatch) => {
  const {
    getContacts
  } = contactsActionCreators;

  return bindActionCreators({
    getContacts
  }, dispatch);
}

export default compose(
  connectAuth(mapStateToProps, undefined),
  connectContacts(mapStateToProps, mapDisptachToProps)
)(ContactsContainer);