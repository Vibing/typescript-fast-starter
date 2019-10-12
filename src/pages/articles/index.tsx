import React, { Component } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

export default class Articles extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    }
  ];

  render() {
    return (
      <div>
        <Link to="/add-article">
          <Button type="primary">添加文章</Button>
        </Link>
        <Table columns={this.columns} dataSource={data} />
      </div>
    );
  }
}
