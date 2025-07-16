// path: @/component/custom/users-component.js

import {
  AntTable,
  AntForm,
  AntDescriptions,
  DetailLink,
  AntConfirm,
  AntButton,
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
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { renderColumns } from "@/lib/util/render-util";

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

export function UsersResetPassword({ userId, ...props }) {
  return (
    <AntConfirm
      {...props}
      onConfirm={() => fetchPut(`/api/users/${userId}/reset-password`)}
      showConfirmMessage={true}
      title="Đặt lại mật khẩu"
      description="Bạn có chắc chắn muốn đặt lại mật khẩu không?"
      icon={<KeyOutlined />}
      okText="Có"
      cancelText="Không"
    >
      <AntButton
        label="Đặt lại mật khẩu"
        icon={<KeyOutlined />}
        color="default"
        variant="link"
        style={{ height: "auto" }}
      />
    </AntConfirm>
  );
}

export function UsersColumns(params, displayConfig = []) {
  const { userStatus, roleList } = params || {};

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "user_name",
      key: "user_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Mô tả",
      dataIndex: "user_desc",
      key: "user_desc",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Trạng thái",
      dataIndex: "user_status_id",
      key: "user_status_id",
      valueType: "select",
      valueEnum: userStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Phone",
      dataIndex: "user_phone",
      key: "user_phone",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Phone 2",
      dataIndex: "user_parent_phone",
      key: "user_parent_phone",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Ghi chú",
      dataIndex: "user_notes",
      key: "user_notes",
      valueType: "textarea",
      search: false,
    },
    {
      title: "Vai trò",
      dataIndex: "role_names",
      key: "role_names",
      valueType: "select",
      valueEnum: roleList?.valueEnum || {},
    },
    {
      key: "displayAvatar",
      width: 68,
      align: "center",
      search: false,
      render: (_, record) => (
        <DetailLink id={record?.id}>
          <Avatar
            src={
              record?.user_avatar
                ? record.user_avatar
                : `https://api.dicebear.com/9.x/bottts/svg?seed=${record.id}`
            }
            shape="square"
            size="large"
            icon={<UserOutlined />}
            alt="Ảnh đại diện"
          />
        </DetailLink>
      ),
    },
    {
      key: "displayUser",
      title: "Người dùng",
      search: false,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record?.user_name}</Typography.Text>
          <Typography.Text type="secondary">
            {record?.user_desc}
          </Typography.Text>
        </Space>
      ),
    },
  ];

  return renderColumns(columns, displayConfig);
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
