// CLASSES TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  ClassesTable,
  ClassesDesc,
  ClassesCreate,
  ClassesEdit,
  ClassesColumns,
  ClassesFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // lớp học logic hooks
  const useClasses = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: ClassesColumns(),
    fields: ClassesFields(),
  };

  // Tab action buttons
  const classesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useClasses.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useClasses.create.open()}
      />
    </Space>
  );

  // Tab content
  const classesContent = (
    <ProCard boxShadow bordered extra={classesButton}>
      <ClassesTable
        tableHook={useClasses.table}
        columns={useClasses.columns}
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
                  useClasses.desc.setParams({ id: record?.id });
                  useClasses.desc.open();
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
                  useClasses.edit.setRequestParams({ id: record?.id });
                  useClasses.edit.setDeleteParams({ id: record?.id });
                  useClasses.edit.open();
                }}
              />
            ),
          },
        ]}
        syncToUrl={false}
      />
      <ClassesCreate
        formHook={useClasses.create}
        fields={useClasses.fields}
        onSubmitSuccess={() => useClasses.table.reload()}
        title="Tạo lớp học"
        variant="drawer"
      />
      <ClassesDesc
        descHook={useClasses.desc}
        columns={useClasses.columns}
        requestParams={useClasses.desc.params}
        title="Thông tin lớp học"
        variant="drawer"
        column={1}
      />
      <ClassesEdit
        formHook={useClasses.edit}
        fields={useClasses.fields}
        requestParams={useClasses.edit.requestParams}
        deleteParams={useClasses.edit.deleteParams}
        onSubmitSuccess={() => useClasses.table.reload()}
        onDeleteSuccess={() => useClasses.table.reload()}
        title="Sửa lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const classesTab = {
    key: "classes",
    label: "Lớp học",
    children: classesContent,
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
        { title: "Lớp học" },
      ]}
      title="Quản lý lớp học"
      extra={pageButton}
      content={pageContent}
      tabList={[classesTab]}
    />
  );
}
