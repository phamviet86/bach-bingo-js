// LECTURES TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  LecturesTable,
  LecturesDesc,
  LecturesCreate,
  LecturesEdit,
  LecturesColumns,
  LecturesFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // bài giảng logic hooks
  const useLectures = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: LecturesColumns(),
    fields: LecturesFields(),
  };

  // Tab action buttons
  const lecturesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useLectures.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useLectures.create.open()}
      />
    </Space>
  );

  // Tab content
  const lecturesContent = (
    <ProCard boxShadow bordered extra={lecturesButton}>
      <LecturesTable
        tableHook={useLectures.table}
        columns={useLectures.columns}
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
                  useLectures.desc.setParams({ id: record?.id });
                  useLectures.desc.open();
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
                  useLectures.edit.setRequestParams({ id: record?.id });
                  useLectures.edit.setDeleteParams({ id: record?.id });
                  useLectures.edit.open();
                }}
              />
            ),
          },
        ]}
        syncToUrl={false}
      />
      <LecturesCreate
        formHook={useLectures.create}
        fields={useLectures.fields}
        onSubmitSuccess={() => useLectures.table.reload()}
        title="Tạo bài giảng"
        variant="drawer"
      />
      <LecturesDesc
        descHook={useLectures.desc}
        columns={useLectures.columns}
        requestParams={useLectures.desc.params}
        title="Thông tin bài giảng"
        variant="drawer"
        column={1}
      />
      <LecturesEdit
        formHook={useLectures.edit}
        fields={useLectures.fields}
        requestParams={useLectures.edit.requestParams}
        deleteParams={useLectures.edit.deleteParams}
        onSubmitSuccess={() => useLectures.table.reload()}
        onDeleteSuccess={() => useLectures.table.reload()}
        title="Sửa bài giảng"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const lecturesTab = {
    key: "lectures",
    label: "Bài giảng",
    children: lecturesContent,
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
        { title: "Bài giảng" },
      ]}
      title="Quản lý bài giảng"
      extra={pageButton}
      content={pageContent}
      tabList={[lecturesTab]}
    />
  );
}
