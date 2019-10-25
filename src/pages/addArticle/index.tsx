import './style.less';
import React, { Component } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import { Remarkable } from 'remarkable';
import * as hljs from 'highlight.js'; // https://highlightjs.org/

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

class RegistrationForm extends React.Component<any, any> {
  state = {
    tags: [],
    types: [],
    editData: {},
    isEdit: false
  };

  md = new Remarkable({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    }
  });
  preview: any;

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.setState({
        isEdit: true
      });
    }

    axios.get(`/article/${id}`).then(res => {
      console.log(res);

      this.setState({
        editData: res
      });
    });

    axios.get('/tag').then(res => {
      this.setState({
        tags: res
      });
    });
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
      <div className="add-container">
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <Form.Item {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue: isEdit ? editData.title : ''
            })(<Input />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="所属标签">
            {getFieldDecorator('tag_id', {
              initialValue: isEdit ? editData.tag_id : []
            })(
              <Select
                allowClear
                placeholder="请选择分类"
                showSearch
                mode="multiple"
              >
                {tags.map((i: any) => (
                  <Option key={1} value={`${i.id}`}>
                    {i.tag_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="文章分类">
            {getFieldDecorator('type_id', {
              initialValue: isEdit ? editData.type_id : []
            })(
              <Select
                allowClear
                placeholder="请选择分类"
                showSearch
                mode="multiple"
              >
                {types.map((i: any) => (
                  <Option key={i.id} value={`${i.id}`}>
                    {i.type_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="内容">
            {getFieldDecorator('content', {
              initialValue: isEdit ? editData.content : ''
            })(<Input.TextArea />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>

            <Button
              style={{ marginLeft: 20 }}
              type="primary"
              onClick={this.previewContent}
            >
              预览
            </Button>
          </Form.Item>
        </Form>
        <div
          className="markdown"
          ref={preview => (this.preview = preview)}
        ></div>
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

  previewContent = () => {
    const content = this.props.form.getFieldValue('content');
    this.preview.innerHTML = this.md.render(content);
  };
}

export default Form.create()(RegistrationForm);
