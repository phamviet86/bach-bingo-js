// USERS LIST PAGE

"use client";

import { Space } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  UsersTable,
  UsersCreate,
  UsersColumns,
  UsersFields,
} from "@/component/custom";
import { useTable, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const { userStatus } = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // người dùng logic hooks
  const useUsers = {
    table: useTable(),
    create: useForm(),
    columns: UsersColumns({ userStatus }),
    fields: UsersFields({ userStatus }),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useUsers.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useUsers.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <UsersTable tableHook={useUsers.table} columns={useUsers.columns} />
      <UsersCreate
        formHook={useUsers.create}
        fields={useUsers.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo người dùng"
        variant="drawer"
      />
    </ProCard>
  );

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
        { title: "Người dùng" },
      ]}
      title="Quản lý người dùng"
      extra={pageButton}
      content={pageContent}
    />
  );
}
