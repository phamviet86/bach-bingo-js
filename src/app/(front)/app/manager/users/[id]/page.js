// USERS DETAIL PAGE

"use client";

import { use } from "react";
import { Space, Avatar } from "antd";
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
    columns: UsersColumns({ userStatus }),
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
    <ResponsiveCard boxShadow bordered splitAt="md">
      <ProCard colSpan={{ sm: 24, md: "240px" }} layout="center">
        <Avatar
          src={
            useUsers.desc.dataSource?.user_avatar ||
            `https://api.dicebear.com/9.x/bottts/svg?seed=${userId}`
          }
          shape="square"
          size={192}
          icon={<UserOutlined />}
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
          title="Sửa người dùng"
          variant="drawer"
        />
      </ProCard>
    </ResponsiveCard>
  );

  // Page title
  const pageTitle = useUsers.desc?.dataSource?.user_name || "Chi tiết";

  // phân quyền logic hooks
  const useUserRoles = {
    table: useTable(),
    transfer: useTransfer(),
    columns: UserRolesColumns({ roleStatus }),
  };

  // Tab action buttons
  const userRolesButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useUserRoles.table.reload()}
      />
      <AntButton
        key="transfer-button"
        label="Điều chỉnh"
        color="primary"
        variant="solid"
        onClick={() => useUserRoles.transfer.open()}
      />
    </Space>
  );

  // Tab content
  const userRolesContent = (
    <ProCard boxShadow bordered extra={userRolesButton}>
      <UserRolesTable
        tableHook={useUserRoles.table}
        columns={useUserRoles.columns}
        requestParams={{ user_id: userId }}
        syncToUrl={false}
        showSearch={false}
        showPagination={false}
      />
      <UserRolesTransfer
        transferHook={useUserRoles.transfer}
        userId={userId}
        roleStatus={roleStatus}
        afterClose={() => useUserRoles.table.reload()}
      />
    </ProCard>
  );

  // Tab definition
  const userRolesTab = {
    key: "userRoles",
    label: "Phân quyền",
    children: userRolesContent,
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
        { title: "Người dùng", path: "/app/manager/users" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[userRolesTab]}
    />
  );
}
