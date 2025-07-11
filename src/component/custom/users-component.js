// path: @/component/custom/users-component.js

import {
  AntTable,
  AntForm,
  AntDescriptions,
  DetailLink,
} from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Space, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function UsersTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/users", params, sort, filter)
      }
    />
  );
}

export function UsersDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/users/${params?.id}`)}
    />
  );
}

export function UsersCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/users", values)}
    />
  );
}

export function UsersEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/users/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/users/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/users/${params?.id}`)}
    />
  );
}

export function UsersColumns(params) {
  const { userStatus } = params || {};
  return [
    {
      width: 68,
      align: "center",
      search: false,
      hideInDescriptions: true,
      render: (_, record) => (
        <DetailLink id={record?.id}>
          <Avatar
            src={
              record?.user_avatar
                ? record.user_avatar
                : `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${record.id}`
            }
            shape="square"
            size="large"
            icon={<UserOutlined />}
          />
        </DetailLink>
      ),
    },
    {
      title: "Người dùng",
      search: false,
      hideInDescriptions: true,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record?.user_name}</Typography.Text>
          <Typography.Text type="secondary">
            {record?.user_desc}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_name",
      valueType: "text",
      hidden: true, // Hidden by default
    },
    {
      title: "Mô tả",
      dataIndex: "user_desc",
      valueType: "text",
      hidden: true, // Hidden by default
    },
    {
      title: "Trạng thái",
      dataIndex: "user_status_id",
      valueType: "select",
      valueEnum: userStatus?.valueEnum || {},
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "user_email",
      valueType: "text",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "user_phone",
      valueType: "text",
      responsive: ["md"],
    },
    {
      title: "Phone 2",
      dataIndex: "user_parent_phone",
      valueType: "text",
      hidden: true, // Hidden by default
    },
    {
      title: "Ghi chú",
      dataIndex: "user_notes",
      valueType: "text",
      responsive: ["xl"],
    },
  ];
}

export function UsersFields(params) {
  const { userStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="user_name"
          label="Tên người dùng"
          placeholder="Nhập tên người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="user_desc"
          label="Mô tả"
          placeholder="Nhập mô tả"
          colProps={{ sm: 12 }}
        />
        <ProFormSelect
          name="user_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          rules={[{ required: true }]}
          options={userStatus?.options || []}
          colProps={{ sm: 12 }}
        />
        <ProFormText
          name="user_email"
          label="Email người dùng"
          placeholder="Nhập email người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="user_phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          colProps={{ sm: 12 }}
        />
        <ProFormText
          name="user_parent_phone"
          label="Số điện thoại phụ huynh"
          placeholder="Nhập số điện thoại"
          colProps={{ sm: 12 }}
        />
        <ProFormTextArea
          name="user_avatar"
          label="Ảnh đại diện"
          placeholder="Nhập link"
          fieldProps={{ autoSize: { minRows: 1, maxRows: 3 } }}
        />
        <ProFormTextArea
          name="user_notes"
          label="Ghi chú"
          placeholder="Nhập ghi chú"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
