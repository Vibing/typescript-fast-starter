import './style.less';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'antd';

axios.defaults.baseURL = __BASE_URL__;

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '版本',
      dataIndex: 'version'
    },
    {
      title: '项目名称',
      dataIndex: 'project_name'
    },
    {
      title: 'git地址',
      dataIndex: 'git_http_url'
    },
    {
      title: '是否部署',
      dataIndex: 'run_state'
    },
    {
      title: '操作',
      dataIndex: 'run_state1',
      render: (text, item) => (
        <Button onClick={() => this.deploy(item)}>部署</Button>
      )
    }
  ];

  componentDidMount() {
    axios.get('version').then(({ data }) => {
      this.setState({
        dataSource: data
      });
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div style={{ width: 1100, margin: '0 auto' }}>
        <Table rowKey={'id'} dataSource={dataSource} columns={this.columns} />
      </div>
    );
  }

  private deploy = async (item: any) => {
    console.log(item);
    const { data } = await axios.post('/deploy', { item });
  };
}

ReactDOM.render(<App />, document.querySelector('#root'));
