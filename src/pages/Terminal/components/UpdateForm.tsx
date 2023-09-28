import { WorkingModeStatus } from '@/constants';
import { Button, Drawer, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';

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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
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
      title="Update Terminal"
      placement="right"
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
          <Input defaultValue={props.values.name} />
        </Form.Item>
        <Form.Item name="status" label="status" rules={[{ type: 'number', min: 0, max: 3 }]}>
          <InputNumber defaultValue={props.values.status} />
        </Form.Item>
        <Form.Item name={['location', 'location']} label="location">
          <Input defaultValue={props?.values?.location?.location} />
        </Form.Item>
        <Form.Item name={['location', 'electrovalency']} label="electrovalency">
          <Input defaultValue={props?.values?.location?.electrovalency} />
        </Form.Item>
        <Form.Item name={['location', 'sunrise']} label="sunrise">
          <Input defaultValue={props?.values?.location?.sunrise} />
        </Form.Item>
        <Form.Item name={['location', 'sunset']} label="sunset">
          <Input defaultValue={props?.values?.location?.sunset} />
        </Form.Item>
        <Form.Item
          name="WorkingMode"
          label="WorkingMode"
          rules={[{ type: 'number', min: 0, max: 3 }]}
        >
          <Select
            defaultValue={props.values.WorkingMode}
            style={{ width: 120 }}
            options={WorkingModeStatus.map((province, index) => ({
              label: province,
              value: index,
            }))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateForm;
