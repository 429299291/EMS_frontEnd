import { Identitys } from '@/constants';
import { sendNotices } from '@/services/ant-design-pro/api';
import { SoundOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, InputNumber, Select, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

export type FormValueType = {
  name: string;
  id: string;
  userId: string;
  status: number;
  WorkingMode: number;
  location: {
    location: string;
  };
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props: any) => {
  const [form] = Form.useForm();
  const [formNotification] = Form.useForm();
  const [noticeVisible, setNoticeVisible] = useState<boolean>(false);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  form.setFieldsValue(props.values);
  return (
    <Drawer
      title="Update Account"
      placement="right"
      width={500}
      onClose={() => {
        props.onCancel();
      }}
      open={props.updateModalOpen}
    >
      <Form
        name="nest-messages"
        form={form}
        onFinish={(data) => {
          props.onSubmit({ ...data, id: props.values.id });
        }}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <p>ID:{props.values.id}</p>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input defaultValue={props.values.name} style={{ width: '170px' }} />
        </Form.Item>
        <Form.Item name="balance" label="balance" rules={[{ type: 'number', max: 10000000 }]}>
          <InputNumber defaultValue={0} style={{ width: '170px' }} />
        </Form.Item>
        <Form.Item name="phone" label="phone" rules={[{ type: 'string', min: 11, max: 11 }]}>
          <Input defaultValue={props.values.status} style={{ width: '170px' }} />
        </Form.Item>
        <Form.Item name="age" label="age" rules={[{ type: 'number', min: 1, max: 111 }]}>
          <InputNumber defaultValue={props.values.status} />
        </Form.Item>
        <Form.Item name={['location', 'location']} label="location">
          <Input defaultValue={props?.values?.location?.location} style={{ width: '170px' }} />
        </Form.Item>
        <Form.Item name="identity" label="identity">
          <Select
            defaultValue={props.values.WorkingMode}
            style={{ width: 120 }}
            options={Identitys.map((province, index) => ({
              label: province,
              value: index,
            }))}
          />
        </Form.Item>
        <Form.Item name="accessPermissions" label="Access Permissions">
          <p>
            {props?.values?.accessPermissions?.map((data) => {
              return (
                <Tag color={data === 'superAdmin' ? 'warning' : '#55acee'} key={data.id}>
                  {data}
                </Tag>
              );
            })}
          </p>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ marginLeft: '2rem' }}
            onClick={() => {
              setNoticeVisible(!noticeVisible);
            }}
            type="primary"
          >
            <SoundOutlined />
            {noticeVisible ? 'Hide Notice' : 'Notice'}
          </Button>
        </Form.Item>
      </Form>
      {/* 通知 */}
      {noticeVisible && (
        <Form
          name="nest-messages"
          form={formNotification}
          onFinish={(data) => {
            sendNotices({ ...data, email: props.values.email });
          }}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              defaultValue={0}
              style={{ width: '140px' }}
              options={[
                { value: 0, label: 'remind' },
                { value: 1, label: 'notify' },
                { value: 2, label: 'warn' },
              ]}
            />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="maxLength is 255" maxLength={255} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Post notice
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

export default UpdateForm;
