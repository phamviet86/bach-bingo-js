// MODULES TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  ModulesTable,
  ModulesDesc,
  ModulesCreate,
  ModulesEdit,
  ModulesColumns,
  ModulesFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // học phần logic hooks
  const useModules = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: ModulesColumns(),
    fields: ModulesFields(),
  };

  // Tab action buttons
  const modulesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useModules.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useModules.create.open()}
      />
    </Space>
  );

  // Tab content
  const modulesContent = (
    <ProCard boxShadow bordered extra={modulesButton}>
      <ModulesTable
        tableHook={useModules.table}
        columns={useModules.columns}
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
                  useModules.desc.setParams({ id: record?.id });
                  useModules.desc.open();
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
                  useModules.edit.setRequestParams({ id: record?.id });
                  useModules.edit.setDeleteParams({ id: record?.id });
                  useModules.edit.open();
                }}
              />
            ),
          },
        ]}
        syncToUrl={false}
      />
      <ModulesCreate
        formHook={useModules.create}
        fields={useModules.fields}
        onSubmitSuccess={() => useModules.table.reload()}
        title="Tạo học phần"
        variant="drawer"
      />
      <ModulesDesc
        descHook={useModules.desc}
        columns={useModules.columns}
        requestParams={useModules.desc.params}
        title="Thông tin học phần"
        variant="drawer"
        column={1}
      />
      <ModulesEdit
        formHook={useModules.edit}
        fields={useModules.fields}
        requestParams={useModules.edit.requestParams}
        deleteParams={useModules.edit.deleteParams}
        onSubmitSuccess={() => useModules.table.reload()}
        onDeleteSuccess={() => useModules.table.reload()}
        title="Sửa học phần"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const modulesTab = {
    key: "modules",
    label: "Học phần",
    children: modulesContent,
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
        { title: "Học phần" },
      ]}
      title="Quản lý học phần"
      extra={pageButton}
      content={pageContent}
      tabList={[modulesTab]}
    />
  );
}
