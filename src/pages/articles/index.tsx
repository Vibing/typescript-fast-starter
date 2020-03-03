import React, { Component } from 'react';
import { Table, Button, Tag, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Articles extends Component {
  state = {
    data: []
  };
  columns = [
    {
      title: '文章名称',
      dataIndex: 'title'
    },
    {
      title: '分类',
      dataIndex: 'type_name',
      render: (text: Array<string>) =>
        text.map((i: string) => <Tag color='#108ee9'>{i}</Tag>)
    },
    {
      title: '创建时间',
      dataIndex: 'create_time'
    },
    {
      title: '更新时间',
      dataIndex: 'update_time'
    },
    {
      title: '操作',
      render: (t: any, r: any) => (
        <>
          <Link to={`/add-article/${r.id}`}>编辑</Link>
          <Divider type='vertical' />
          <a href='javascript:;' onClick={() => this.del(r.id)}>
            删除
          </a>
        </>
      )
    }
  ];

  async componentDidMount() {
    const res: any = await axios.get('/article');
    this.setState({
      data: res
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Link to='/add-article'>
          <Button type='primary'>添加文章</Button>
        </Link>
        <Table
          columns={this.columns}
          dataSource={data.list}
          pagination={{
            total: data.total,
            onChange: this.pageChange
          }}
        />
      </div>
    );
  }

  pageChange = async (page: any) => {
    const res: any = await axios.get('/article', {
      params: {
        page: page - 1
      }
    });
    this.setState({
      data: res
    });
  };

  del = id => {
    axios.delete(`/article/${id}`).then(async () => {
      message.success('删除成功');
      const res = await axios.get('/article');
      this.setState({
        data: res
      });
    });
  };
}
