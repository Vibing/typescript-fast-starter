import './style.less';
import React, { Component } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

class RegistrationForm extends React.Component<any, any> {
  state = {
    content: '',
    tags: [],
    types: [],
    editData: {},
    isEdit: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.setState({
        isEdit: true
      });

      axios.get(`/article/${id}`).then(res => {
        console.log(res);

        this.setState({
          editData: res
        });
      });
    }

    axios.get('/article-type').then(res => {
      this.setState({
        types: res
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, types, isEdit, editData } = this.state;

    return (
      <div className='add-container'>
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <Form.Item {...formItemLayout} label='标题'>
            {getFieldDecorator('title', {
              initialValue: isEdit ? editData.title : ''
            })(<Input />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='文章分类'>
            {getFieldDecorator('type_id', {
              initialValue: isEdit ? editData.type_id : []
            })(
              <Select
                allowClear
                placeholder='请选择分类'
                showSearch
                mode='multiple'
              >
                {types.map((i: any) => (
                  <Option key={i.id} value={`${i.id}`}>
                    {i.type_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='文章属性'>
            {getFieldDecorator('type', {
              initialValue: isEdit ? editData.type : '0'
            })(
              <Select allowClear placeholder='请选择分类'>
                <Option value={'0'}>技术</Option>
                <Option value={'1'}>生活</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label='简介'>
            {getFieldDecorator('description', {
              initialValue: isEdit ? editData.description : ''
            })(<Input.TextArea />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label='内容'>
            {getFieldDecorator('content', {
              initialValue: isEdit ? editData.content : ''
            })(<Input.TextArea rows={20} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  handleSubmit = e => {
    const { isEdit } = this.state;
    const { id } = this.props.match.params;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      isEdit ? this.updateArticle(id, values) : this.createArticle(values);
    });
  };

  createArticle = async (values: any) => {
    await axios.post('/article', values);
    message.success('保存成功');
  };

  updateArticle = async (id: string, values: any) => {
    try {
      await axios.put(`/article/${id}`, values);
      message.success('更新成功');
    } catch (error) {
      message.success('更新失败');
    }
  };
}

export default Form.create()(RegistrationForm);
