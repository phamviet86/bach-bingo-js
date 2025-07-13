// ENROLLMENTS TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  EnrollmentsTable,
  EnrollmentsDesc,
  EnrollmentsCreate,
  EnrollmentsEdit,
  EnrollmentsColumns,
  EnrollmentsFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // đăng ký logic hooks
  const useEnrollments = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: EnrollmentsColumns(),
    fields: EnrollmentsFields(),
  };

  // Tab action buttons
  const enrollmentsButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useEnrollments.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useEnrollments.create.open()}
      />
    </Space>
  );

  // Tab content
  const enrollmentsContent = (
    <ProCard boxShadow bordered extra={enrollmentsButton}>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
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
                  useEnrollments.desc.setParams({ id: record?.id });
                  useEnrollments.desc.open();
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
                  useEnrollments.edit.setRequestParams({ id: record?.id });
                  useEnrollments.edit.setDeleteParams({ id: record?.id });
                  useEnrollments.edit.open();
                }}
              />
            ),
          },
        ]}
        syncToUrl={false}
      />
      <EnrollmentsCreate
        formHook={useEnrollments.create}
        fields={useEnrollments.fields}
        onSubmitSuccess={() => useEnrollments.table.reload()}
        title="Tạo đăng ký"
        variant="drawer"
      />
      <EnrollmentsDesc
        descHook={useEnrollments.desc}
        columns={useEnrollments.columns}
        requestParams={useEnrollments.desc.params}
        title="Thông tin đăng ký"
        variant="drawer"
        column={1}
      />
      <EnrollmentsEdit
        formHook={useEnrollments.edit}
        fields={useEnrollments.fields}
        requestParams={useEnrollments.edit.requestParams}
        deleteParams={useEnrollments.edit.deleteParams}
        onSubmitSuccess={() => useEnrollments.table.reload()}
        onDeleteSuccess={() => useEnrollments.table.reload()}
        title="Sửa đăng ký"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const enrollmentsTab = {
    key: "enrollments",
    label: "Đăng ký",
    children: enrollmentsContent,
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
        { title: "Đăng ký" },
      ]}
      title="Quản lý đăng ký"
      extra={pageButton}
      content={pageContent}
      tabList={[enrollmentsTab]}
    />
  );
}
