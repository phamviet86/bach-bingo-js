// USERS DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  UsersDesc,
  UsersEdit,
  UsersColumns,
  UsersFields,
} from "@/component/custom";
import { useDesc, useForm, useNav } from "@/component/hook";
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
  const { userStatus } = usePageContext();

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
    <ProCard boxShadow bordered>
      <UsersDesc
        descHook={useUsers.desc}
        columns={useUsers.columns}
        requestParams={{ id: userId }}
        onRequestSuccess={(result) =>
          useUsers.desc.setDataSource(result?.data?.[0])
        }
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
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "người dùng", path: "/app/system/users" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
