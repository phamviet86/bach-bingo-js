// SYLLABUSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { BankOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  SyllabusesDesc,
  SyllabusesEdit,
  SyllabusesColumns,
  SyllabusesFields,
  ModulesTable,
  ModulesDesc,
  ModulesCreate,
  ModulesEdit,
  ModulesColumns,
  ModulesFields,
  LecturesTable,
  LecturesDesc,
  LecturesCreate,
  LecturesEdit,
  LecturesColumns,
  LecturesFields,
} from "@/component/custom";
import { useDesc, useForm, useNav, useTable } from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const { syllabusStatus, moduleStatus, lectureStatus } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: syllabusId } = use(params);

  // giáo trình logic hooks
  const useSyllabuses = {
    desc: useDesc(),
    edit: useForm(),
    columns: SyllabusesColumns({ syllabusStatus }),
    fields: SyllabusesFields({ syllabusStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useSyllabuses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SyllabusesDesc
        descHook={useSyllabuses.desc}
        columns={useSyllabuses.columns}
        requestParams={{ id: syllabusId }}
        onRequestSuccess={(result) =>
          useSyllabuses.desc.setDataSource(result?.data?.[0])
        }
      />
      <SyllabusesEdit
        formHook={useSyllabuses.edit}
        fields={useSyllabuses.fields}
        requestParams={{ id: syllabusId }}
        deleteParams={{ id: syllabusId }}
        onSubmitSuccess={() => useSyllabuses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa giáo trình"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useSyllabuses.desc?.dataSource?.syllabus_name || "Chi tiết";

  // Modules logic hooks
  const useModules = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: ModulesColumns({ moduleStatus }),
    fields: ModulesFields({ moduleStatus }),
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
        requestParams={{ syllabus_id: syllabusId }}
        syncToUrl={false}
        showSearch={false}
        showPagination={false}
      />
      <ModulesCreate
        formHook={useModules.create}
        fields={useModules.fields}
        onSubmitSuccess={() => useModules.table.reload()}
        initialValues={{ syllabus_id: syllabusId }}
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

  // Lectures logic hooks
  const useLectures = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: LecturesColumns({ lectureStatus, syllabusId }),
    fields: LecturesFields({ lectureStatus, syllabusId }),
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
        requestParams={{ syllabus_id: syllabusId }}
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
              <BankOutlined />
              <span>Quản lý</span>
            </Space>
          ),
        },
        { title: "Giáo trình", path: "/app/manager/syllabuses" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[modulesTab, lecturesTab]}
    />
  );
}
