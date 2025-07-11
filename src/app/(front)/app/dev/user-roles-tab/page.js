// USER_ROLES TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  UserRolesTable,
  UserRolesDesc,
  UserRolesCreate,
  UserRolesEdit,
  UserRolesColumns,
  UserRolesFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // phân quyền logic hooks
  const useUserRoles = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: UserRolesColumns(),
    fields: UserRolesFields(),
  };

  // Tab action buttons
  const userRolesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useUserRoles.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useUserRoles.create.open()}
      />
    </Space>
  );

  // Tab content
  const userRolesContent = (
    <ProCard boxShadow bordered extra={userRolesButton}>
      <UserRolesTable
        tableHook={useUserRoles.table}
        columns={useUserRoles.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EyeOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  useUserRoles.desc.setParams({ id: record?.id });
                  useUserRoles.desc.open();
                }}
              />
            ),
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EditOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  useUserRoles.edit.setRequestParams({ id: record?.id });
                  useUserRoles.edit.setDeleteParams({ id: record?.id });
                  useUserRoles.edit.open();
                }}
              />
            ),
          },
        ]}
        syncToUrl={false}
      />
      <UserRolesCreate
        formHook={useUserRoles.create}
        fields={useUserRoles.fields}
        onSubmitSuccess={() => useUserRoles.table.reload()}
        title="Tạo phân quyền"
        variant="drawer"
      />
      <UserRolesDesc
        descHook={useUserRoles.desc}
        columns={useUserRoles.columns}
        requestParams={useUserRoles.desc.params}
        title="Thông tin phân quyền"
        variant="drawer"
        column={1}
      />
      <UserRolesEdit
        formHook={useUserRoles.edit}
        fields={useUserRoles.fields}
        requestParams={useUserRoles.edit.requestParams}
        deleteParams={useUserRoles.edit.deleteParams}
        onSubmitSuccess={() => useUserRoles.table.reload()}
        onDeleteSuccess={() => useUserRoles.table.reload()}
        title="Sửa phân quyền"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const userRolesTab = {
    key: "userRoles",
    label: "Phân quyền",
    children: userRolesContent,
  };

  // Render
  return (
    <AntPage
      items={[
        {
          title: (
            <Space>
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "Phân quyền" },
      ]}
      title="Quản lý phân quyền"
      extra={pageButton}
      content={pageContent}
      tabList={[userRolesTab]}
    />
  );
}
