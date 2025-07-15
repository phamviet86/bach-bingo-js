// path: @/component/custom/roles-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

export function RolesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/roles", params, sort, filter)
      }
    />
  );
}

export function RolesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/roles/${params?.id}`)}
    />
  );
}

export function RolesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/roles", values)}
    />
  );
}

export function RolesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/roles/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/roles/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/roles/${params?.id}`)}
    />
  );
}

export function RolesColumns(params, displayConfig = []) {
  const { roleStatus } = params || {};

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "role_name",
      key: "role_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Trạng thái ",
      dataIndex: "role_status_id",
      key: "role_status_id",
      valueType: "select",
      valueEnum: roleStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      title: "Đường dẫn",
      dataIndex: "role_path",
      key: "role_path",
      valueType: "text",
      sorter: { multiple: 1 },
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function RolesFields(params) {
  const { roleStatus } = params || {};

  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="role_name"
          label="Tên vai trò"
          placeholder="Nhập Tên vai trò"
          rules={[{ required: true }]}
          colProps={{ sm: 12 }}
        />
        <ProFormSelect
          name="role_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          rules={[{ required: true }]}
          options={roleStatus?.options || []}
          colProps={{ sm: 12 }}
        />
        <ProFormText
          name="role_path"
          label="Đường dẫn vai trò"
          placeholder="Nhập Đường dẫn vai trò"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
