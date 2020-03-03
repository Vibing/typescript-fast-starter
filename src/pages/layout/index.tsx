import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
// import SideMenu from './components/menu';

const { Header, Content, Footer, Sider } = Layout;

const menuData = [
  {
    name: 'AA管理',
    icon: 'user',
    key: 'user',
    children: [
      {
        name: 'AA列表',
        path: '/article'
      },
      {
        name: 'AA配置',
        path: '/article-setting'
      }
    ]
  },
  {
    name: 'BB管理',
    icon: 'upload',
    key: 'upload',
    children: [
      {
        name: 'BB列表',
        path: '/upload-list'
      },
      {
        name: 'BB配置',
        path: '/upload-setting'
      }
    ]
  }
];

export default class App extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <div className="logo" />
          {/* <SideMenu menuData={menuData} /> */}

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* <SideMenu menuData={menuData} /> */}
            <Menu.Item key="1">
              <Link to={'/'}>
                <Icon type="user" />
                文章
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="bar-chart" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="cloud-o" />
              <span className="nav-text">nav 5</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="appstore-o" />
              <span className="nav-text">nav 6</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="team" />
              <span className="nav-text">nav 7</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="shop" />
              <span className="nav-text">nav 8</span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'hidden' }}>
            <div
              style={{
                padding: 24,
                background: '#fff',
                height: '100%',
                overflow: 'auto'
              }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
