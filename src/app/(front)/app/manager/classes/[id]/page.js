// CLASSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { BankOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  ClassesDesc,
  ClassesEdit,
  ClassesColumns,
  ClassesFields,
  EnrollmentsTable,
  EnrollmentsDesc,
  EnrollmentsCreate,
  EnrollmentsEdit,
  EnrollmentsColumns,
  EnrollmentsFields,
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
  const {
    classStatus,
    enrollmentStatus,
    enrollmentType,
    enrollmentPaymentType,
  } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: classId } = use(params);

  // lớp học logic hooks
  const useClasses = {
    desc: useDesc(),
    edit: useForm(),
    columns: ClassesColumns({ classStatus }),
    fields: ClassesFields({ classStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useClasses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesDesc
        descHook={useClasses.desc}
        columns={useClasses.columns}
        requestParams={{ id: classId }}
        onRequestSuccess={(result) =>
          useClasses.desc.setDataSource(result?.data?.[0])
        }
      />
      <ClassesEdit
        formHook={useClasses.edit}
        fields={useClasses.fields}
        requestParams={{ id: classId }}
        deleteParams={{ id: classId }}
        onSubmitSuccess={() => useClasses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle =
    `${useClasses.desc?.dataSource?.course_name} - ${useClasses.desc?.dataSource?.module_name}` ||
    "Chi tiết";

  // enrollments logic hooks
  const useEnrollments = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: EnrollmentsColumns({
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
    }),
    fields: EnrollmentsFields({
      enrollmentStatus,
      enrollmentType,
      enrollmentPaymentType,
    }),
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
              <BankOutlined />
              <span>Quản lý</span>
            </Space>
          ),
        },
        { title: "Lớp học", path: "/app/manager/classes" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[enrollmentsTab]}
    />
  );
}
