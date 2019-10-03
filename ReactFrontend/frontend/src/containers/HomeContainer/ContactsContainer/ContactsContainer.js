import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Drawer, Layout, Table } from 'antd';
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
    console.log('contactList', contactList);
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
              title={user.name}
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <div className="contacts_list">
                {
                  contactList && contactList.map((contact, index) => (
                    <div key={index}>{contact.name}</div>
                  ))
                }
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