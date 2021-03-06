import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TemplateForm = (props) => {
	console.log(props.match.params)

  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'domesticAndTemplateForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageContainer content={<FormattedMessage id="domesticandtemplateform.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="domesticandtemplateform.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'domesticandtemplateform.title.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'domesticandtemplateform.title.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="domesticandtemplateform.date.label" />}
            name="date"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'domesticandtemplateform.date.required',
                }),
              },
            ]}
          >
            <RangePicker
              style={{
                width: '100%',
              }}
              placeholder={[
                formatMessage({
                  id: 'domesticandtemplateform.placeholder.start',
                }),
                formatMessage({
                  id: 'domesticandtemplateform.placeholder.end',
                }),
              ]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="domesticandtemplateform.goal.label" />}
            name="goal"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'domesticandtemplateform.goal.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'domesticandtemplateform.goal.placeholder',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="domesticandtemplateform.standard.label" />}
            name="standard"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'domesticandtemplateform.standard.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder={formatMessage({
                id: 'domesticandtemplateform.standard.placeholder',
              })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="domesticandtemplateform.client.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="domesticandtemplateform.form.optional" />
                  <Tooltip title={<FormattedMessage id="domesticandtemplateform.label.tooltip" />}>
                    <InfoCircleOutlined
                      style={{
                        marginRight: 4,
                      }}
                    />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input
              placeholder={formatMessage({
                id: 'domesticandtemplateform.client.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="domesticandtemplateform.invites.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="domesticandtemplateform.form.optional" />
                </em>
              </span>
            }
            name="invites"
          >
            <Input
              placeholder={formatMessage({
                id: 'domesticandtemplateform.invites.placeholder',
              })}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="domesticandtemplateform.weight.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="domesticandtemplateform.form.optional" />
                </em>
              </span>
            }
            name="weight"
          >
            <InputNumber
              placeholder={formatMessage({
                id: 'domesticandtemplateform.weight.placeholder',
              })}
              min={0}
              max={100}
            />
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="domesticandtemplateform.public.label" />}
            help={<FormattedMessage id="domesticandtemplateform.label.help" />}
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  <FormattedMessage id="domesticandtemplateform.radio.public" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="domesticandtemplateform.radio.partially-public" />
                </Radio>
                <Radio value="3">
                  <FormattedMessage id="domesticandtemplateform.radio.private" />
                </Radio>
              </Radio.Group>
              <FormItem
                style={{
                  marginBottom: 0,
                }}
                name="publicUsers"
              >
                <Select
                  mode="multiple"
                  placeholder={formatMessage({
                    id: 'domesticandtemplateform.publicUsers.placeholder',
                  })}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    <FormattedMessage id="domesticandtemplateform.option.A" />
                  </Option>
                  <Option value="2">
                    <FormattedMessage id="domesticandtemplateform.option.B" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="domesticandtemplateform.option.C" />
                  </Option>
                </Select>
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="domesticandtemplateform.form.submit" />
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
            >
              <FormattedMessage id="domesticandtemplateform.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['domesticAndTemplateForm/submitRegularForm'],
}))(TemplateForm);
