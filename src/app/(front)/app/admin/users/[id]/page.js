// USERS DETAIL PAGE

"use client";

import { use } from "react";
import { Space, Avatar, Image } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
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
  UserRolesTable,
  UserRolesColumns,
  UserRolesTransfer,
} from "@/component/custom";
import {
  useTable,
  useDesc,
  useForm,
  useNav,
  useTransfer,
} from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";
import { USERS_COLUMN, USER_ROLES_COLUMN } from "@/component/config";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const { userStatus, roleStatus } = usePageContext();

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
    />
  );
}
