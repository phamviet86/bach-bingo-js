// ROLES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  RolesDesc,
  RolesEdit,
  RolesColumns,
  RolesFields,
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
  const { roleStatus } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: roleId } = use(params);

  // vai trò logic hooks
  const useRoles = {
    desc: useDesc(),
    edit: useForm(),
    columns: RolesColumns({ roleStatus }),
    fields: RolesFields({ roleStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useRoles.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <RolesDesc
        descHook={useRoles.desc}
        columns={useRoles.columns}
        requestParams={{ id: roleId }}
        onRequestSuccess={(result) =>
          useRoles.desc.setDataSource(result?.data?.[0])
        }
      />
      <RolesEdit
        formHook={useRoles.edit}
        fields={useRoles.fields}
        requestParams={{ id: roleId }}
        deleteParams={{ id: roleId }}
        onSubmitSuccess={() => useRoles.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa vai trò"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useRoles.desc?.dataSource?.role_name || "Chi tiết";

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
        { title: "Vai trò", path: "/app/system/roles" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
