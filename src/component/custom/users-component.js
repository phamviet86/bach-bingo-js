// path: @/component/custom/users-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormDigit } from "@ant-design/pro-form";

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
  const {} = params || {};
  return [
    {
      title: "Tên người dùng",
      dataIndex: "user_name",
      valueType: "text",
    },
    {
      title: "Trạng thái người dùng",
      dataIndex: "user_status_id",
      valueType: "digit",
    },
    {
      title: "Email người dùng",
      dataIndex: "user_email",
      valueType: "text",
    },
    {
      title: "Mật khẩu người dùng",
      dataIndex: "user_password",
      valueType: "text",
    },
    {
      title: "Số điện thoại",
      dataIndex: "user_phone",
      valueType: "text",
    },
    {
      title: "Số điện thoại phụ huynh",
      dataIndex: "user_parent_phone",
      valueType: "text",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "user_avatar",
      valueType: "text",
    },
    {
      title: "Mô tả",
      dataIndex: "user_desc",
      valueType: "text",
    },
    {
      title: "Ghi chú",
      dataIndex: "user_notes",
      valueType: "text",
    },
  ];
}

export function UsersFields(params) {
  const {} = params || {};
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
        <ProFormDigit
          name="user_status_id"
          label="Trạng thái người dùng"
          placeholder="Nhập trạng thái người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="user_email"
          label="Email người dùng"
          placeholder="Nhập email người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="user_password"
          label="Mật khẩu người dùng"
          placeholder="Nhập mật khẩu người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="user_phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
        />
        <ProFormText
          name="user_parent_phone"
          label="Số điện thoại phụ huynh"
          placeholder="Nhập số điện thoại phụ huynh"
        />
        <ProFormText
          name="user_avatar"
          label="Ảnh đại diện"
          placeholder="Nhập ảnh đại diện"
        />
        <ProFormText name="user_desc" label="Mô tả" placeholder="Nhập mô tả" />
        <ProFormText
          name="user_notes"
          label="Ghi chú"
          placeholder="Nhập ghi chú"
        />
      </ProForm.Group>
    </>
  );
}
