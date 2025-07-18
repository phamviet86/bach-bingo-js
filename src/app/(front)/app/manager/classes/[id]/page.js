// CLASSES DETAIL PAGE

"use client";

import { use, useState } from "react";
import { Space, Avatar, Dropdown } from "antd";
import { BankOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  ClassesDesc,
  ClassesEdit,
  ClassesColumns,
  ClassesFields,
  EnrollmentsTable,
  EnrollmentsDesc,
  EnrollmentsEdit,
  EnrollmentsColumns,
  EnrollmentsFields,
  ClassEnrollmentsTransfer,
  ClassWaitingEnrollmentsTransfer,
} from "@/component/custom";
import {
  useDesc,
  useForm,
  useNav,
  useTable,
  useTransfer,
} from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";
import { CLASSES_COLUMN, CLASS_ENROLLMENTS_COLUMN } from "@/component/config";

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

  // class status
  const [moduleId, setModuleId] = useState(null);

  // lớp học logic hooks
  const useClasses = {
    desc: useDesc(),
    edit: useForm(),
    columns: ClassesColumns({ classStatus }, CLASSES_COLUMN),
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
        onRequestSuccess={(result) => {
          const recordData = result?.data?.[0];
          useClasses.desc.setDataSource(recordData);
          setModuleId(recordData?.module_id);
        }}
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

  // enrollments state
  const [enrollmentTypeId, setEnrollmentTypeId] = useState(null);

  // enrollments logic hooks
  const useEnrollments = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    transfer: useTransfer(),
    waitingTransfer: useTransfer(),
    columns: EnrollmentsColumns(
      {
        enrollmentStatus,
        enrollmentType,
        enrollmentPaymentType,
      },
      CLASS_ENROLLMENTS_COLUMN
    ),
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
      <Dropdown.Button
        menu={{
          items: [
            {
              key: "add-teacher",
              label: "Thêm giáo viên",
              onClick: () => {
                setEnrollmentTypeId(24);
                useEnrollments.transfer.setSourceParams({
                  role_names_like: "Giáo viên",
                });
                useEnrollments.transfer.open();
              },
            },
            {
              key: "add-ta",
              label: "Thêm trợ giảng",
              onClick: () => {
                setEnrollmentTypeId(25);
                useEnrollments.transfer.setSourceParams({
                  role_names_like: "Trợ giảng",
                });
                useEnrollments.transfer.open();
              },
            },
            {
              key: "add-student",
              label: "Thêm học viên",
              onClick: () => {
                setEnrollmentTypeId(26);
                useEnrollments.transfer.setSourceParams({});
                useEnrollments.transfer.open();
              },
            },
          ],
        }}
        type="primary"
        onClick={() => {
          useEnrollments.waitingTransfer.open();
        }}
      >
        Danh sách chờ
      </Dropdown.Button>
    </Space>
  );

  // Tab content
  const enrollmentsContent = (
    <ProCard boxShadow bordered extra={enrollmentsButton}>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
        requestParams={{ class_id: classId }}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <Avatar
                src={
                  record?.user_avatar
                    ? record.user_avatar
                    : `https://api.dicebear.com/9.x/bottts/svg?seed=${record.user_id}`
                }
                shape="square"
                size="large"
                icon={<UserOutlined />}
                alt="Ảnh đại diện"
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
      <ClassEnrollmentsTransfer
        transferHook={useEnrollments.transfer}
        classId={classId}
        enrollmentTypeId={enrollmentTypeId}
        sourceParams={useEnrollments.transfer.sourceParams}
        targetParams={{
          class_id: classId,
          enrollment_type_id: enrollmentTypeId,
        }}
        afterClose={() => useEnrollments.table.reload()}
      />
      <ClassWaitingEnrollmentsTransfer
        transferHook={useEnrollments.waitingTransfer}
        classId={classId}
        enrollmentTypeId={enrollmentTypeId}
        sourceParams={{ "e.module_id": moduleId }}
        targetParams={{ enrollment_status_id: 32 }}
        afterClose={() => useEnrollments.table.reload()}
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
    label: "Danh sách lớp",
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
