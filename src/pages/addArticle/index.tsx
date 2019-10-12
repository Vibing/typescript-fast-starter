import './style.less';
import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
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
    types: []
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
    const { tags, types } = this.state;

    return (
      <div className="add-container">
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <Form.Item {...formItemLayout} label="标题">
            {getFieldDecorator('title', {})(<Input />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="所属标签">
            {getFieldDecorator('tag_id')(
              <Select
                allowClear
                placeholder="请选择文章标签"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {tags.map((i: any) => (
                  <Option key={1} value={i.id}>
                    {i.tag_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="文章分类">
            {getFieldDecorator('type_id')(
              <Select
                allowClear
                placeholder="请选择分类"
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {types.map((i: any) => (
                  <Option key={1} value={i.id}>
                    {i.type_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="内容">
            {getFieldDecorator('content', {})(<Input.TextArea />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>

            <Button type="primary" onClick={this.previewContent}>
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
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      this.createArticle(values);
    });
  };

  createArticle = async (values: any) => {
    await axios.post('/article', values);
  };

  previewContent = () => {
    const content = this.props.form.getFieldValue('content');
    this.preview.innerHTML = this.md.render(content);
  };
}

export default Form.create()(RegistrationForm);
