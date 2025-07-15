// path: @/component/custom/user-roles-component.js

import {
  AntTable,
  AntForm,
  AntDescriptions,
  AntTransfer,
} from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText } from "@ant-design/pro-form";
import { renderColumns, renderEnum } from "@/lib/util/render-util";

export function UserRolesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/user-roles", params, sort, filter)
      }
    />
  );
}

export function UserRolesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/user-roles/${params?.id}`)}
    />
  );
}

export function UserRolesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/user-roles", values)}
    />
  );
}

export function UserRolesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/user-roles/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/user-roles/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/user-roles/${params?.id}`)}
    />
  );
}

export function UserRolesTransfer({ userId, roleStatus, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={() => fetchList(`/api/roles`)}
      onTargetRequest={() => fetchList(`/api/users/${userId}/user-roles`)}
      onAddItem={(keys) =>
        fetchPost(`/api/users/${userId}/user-roles`, {
          roleIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/users/${userId}/user-roles`, {
          roleIds: keys,
        })
      }
      sourceItem={{ key: "id", disabled: ["role_status_id", [7]] }}
      targetItem={{ key: "role_id" }}
      render={(record) =>
        renderEnum(
          roleStatus?.valueEnum,
          record?.role_status_id,
          record?.role_name,
          "badge"
        )
      }
      titles={["Vai trò", "Đã gán"]}
      operations={["Thêm quyền", "Xóa quyền"]}
      variant="modal"
      modalProps={{ title: "Phân quyền" }}
    />
  );
}

export function UserRolesColumns(params, displayConfig = []) {
  const { roleStatus } = params || {};

  const columns = [
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
      valueType: "text",
      render: (text, record) =>
        renderEnum(
          roleStatus?.valueEnum,
          record?.role_status_id,
          text,
          "badge"
        ),
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

export function UserRolesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="user_id"
          label="Người dùng"
          placeholder="Nhập Người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="role_id"
          label="Vai trò"
          placeholder="Nhập Vai trò"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
