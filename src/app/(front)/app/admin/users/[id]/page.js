// USERS DETAIL PAGE

"use client";

import { use } from "react";
import { Space, Image } from "antd";
import { BankOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import {
  AntPage,
  AntButton,
  BackButton,
  ResponsiveCard,
} from "@/component/common";
import {
  UsersDesc,
  UsersEdit,
  UsersResetPassword,
  UsersColumns,
  UsersFields,
  EnrollmentsTable,
  EnrollmentsDesc,
  EnrollmentsEdit,
  EnrollmentsColumns,
  EnrollmentsFields,
  UserEnrollmentsTransfer,
  UserWaitingEnrollmentsTransfer,
} from "@/component/custom";
import {
  useTable,
  useDesc,
  useForm,
  useNav,
  useTransfer,
} from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";
import { USERS_COLUMN, USER_ENROLLMENTS_COLUMN } from "@/component/config";

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
    userStatus,
    enrollmentStatus,
    enrollmentType,
    enrollmentPaymentType,
  } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: userId } = use(params);

  // người dùng logic hooks
  const useUsers = {
    desc: useDesc(),
    edit: useForm(),
    columns: UsersColumns({ userStatus }, USERS_COLUMN),
    fields: UsersFields({ userStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useUsers.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ResponsiveCard
      boxShadow
      bordered
      splitAt="md"
      actions={<UsersResetPassword userId={userId} />}
    >
      <ProCard colSpan={{ sm: 24, md: "240px" }} layout="center">
        <Image
          src={
            useUsers.desc.dataSource?.user_avatar ||
            `https://api.dicebear.com/9.x/bottts/svg?seed=${userId}`
          }
          alt="Ảnh đại diện"
        />
      </ProCard>
      <ProCard>
        <UsersDesc
          descHook={useUsers.desc}
          columns={useUsers.columns}
          requestParams={{ id: userId }}
          onRequestSuccess={(result) =>
            useUsers.desc.setDataSource(result?.data?.[0])
          }
          column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
        />
        <UsersEdit
          formHook={useUsers.edit}
          fields={useUsers.fields}
          requestParams={{ id: userId }}
          deleteParams={{ id: userId }}
          onSubmitSuccess={() => useUsers.desc.reload()}
          onDeleteSuccess={() => navBack()}
          showDeleteBtn={false}
          title="Sửa người dùng"
          variant="drawer"
        />
      </ProCard>
    </ResponsiveCard>
  );

  // Page title
  const pageTitle = useUsers.desc?.dataSource?.user_name || "Chi tiết";

  // enrollments logic hooks
  const useEnrollments = {
    table: useTable(),
    waitingTable: useTable(),
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
      USER_ENROLLMENTS_COLUMN
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
      <AntButton
        key="add-class-button"
        label="Đăng ký lớp"
        color="primary"
        variant="solid"
        onClick={() => useEnrollments.transfer.open()}
      />
    </Space>
  );

  // Tab content
  const enrollmentsContent = (
    <ProCard boxShadow bordered extra={enrollmentsButton}>
      <EnrollmentsTable
        tableHook={useEnrollments.table}
        columns={useEnrollments.columns}
        requestParams={{
          user_id: userId,
          enrollment_type_id: 26,
        }}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              if (record?.class_id) {
                return (
                  <AntButton
                    icon={<EyeOutlined />}
                    color="primary"
                    variant="link"
                    onClick={() => {
                      useEnrollments.desc.setParams({ id: record?.id });
                      useEnrollments.desc.open();
                    }}
                  />
                );
              }
            },
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              if (record?.class_id) {
                return (
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
                );
              }
            },
          },
        ]}
        syncToUrl={false}
      />
      <UserEnrollmentsTransfer
        transferHook={useEnrollments.transfer}
        userId={userId}
        enrollmentTypeId={26}
        sourceParams={{ class_status_id_in: [21, 22] }}
        targetParams={{ user_id: userId, enrollment_type_id: 26 }}
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
              <span>Quản sinh</span>
            </Space>
          ),
        },
        { title: "Danh bạ", path: "/app/admin/users" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[enrollmentsTab]}
    />
  );
}
