// COURSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { BankOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  CoursesDesc,
  CoursesEdit,
  CoursesColumns,
  CoursesFields,
  ClassesTable,
  ClassesDesc,
  ClassesEdit,
  ClassesTransfer,
  ClassesColumns,
  ClassesFields,
} from "@/component/custom";
import {
  useDesc,
  useForm,
  useNav,
  useTable,
  useTransfer,
} from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";
import { COURSES_COLUMN, COURSE_CLASSES_COLUMN } from "@/component/config";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const { classStatus } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: courseId } = use(params);

  // khóa học logic hooks
  const useCourses = {
    desc: useDesc(),
    edit: useForm(),
    columns: CoursesColumns({}, COURSES_COLUMN),
    fields: CoursesFields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useCourses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <CoursesDesc
        descHook={useCourses.desc}
        columns={useCourses.columns}
        requestParams={{ id: courseId }}
        onRequestSuccess={(result) =>
          useCourses.desc.setDataSource(result?.data?.[0])
        }
      />
      <CoursesEdit
        formHook={useCourses.edit}
        fields={useCourses.fields}
        requestParams={{ id: courseId }}
        deleteParams={{ id: courseId }}
        onSubmitSuccess={() => useCourses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa khóa học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useCourses.desc?.dataSource?.course_name || "Chi tiết";

  // classes logic hooks
  const useClasses = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    transfer: useTransfer(),
    columns: ClassesColumns({ classStatus }, COURSE_CLASSES_COLUMN),
    fields: ClassesFields({ classStatus }),
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
        key="transfer-button"
        label="Điều chỉnh"
        color="primary"
        variant="solid"
        onClick={() => useClasses.transfer.open()}
      />
    </Space>
  );

  // Tab content
  const classesContent = (
    <ProCard boxShadow bordered extra={classesButton}>
      <ClassesTable
        tableHook={useClasses.table}
        requestParams={{ course_id: courseId }}
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
        showSearch={false}
        showPagination={false}
      />
      <ClassesTransfer
        transferHook={useClasses.transfer}
        courseId={courseId}
        afterClose={() => useClasses.table.reload()}
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
              <BankOutlined />
              <span>Quản lý</span>
            </Space>
          ),
        },
        { title: "Khóa học", path: "/app/manager/courses" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[classesTab]}
    />
  );
}
