// OPTIONS DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  OptionsDesc,
  OptionsEdit,
  OptionsColumns,
  OptionsFields,
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
  const {} = usePageContext();

  // Hooks
  const { navBack } = useNav();
  const { id: optionId } = use(params);

  // Option logic hooks
  const useOptions = {
    desc: useDesc(),
    edit: useForm(),
    columns: OptionsColumns(),
    fields: OptionsFields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useOptions.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <OptionsDesc
        descHook={useOptions.desc}
        columns={useOptions.columns}
        requestParams={{ id: optionId }}
        onRequestSuccess={(result) =>
          useOptions.desc.setDataSource(result?.data?.[0])
        }
      />
      <OptionsEdit
        formHook={useOptions.edit}
        fields={useOptions.fields}
        requestParams={{ id: optionId }}
        deleteParams={{ id: optionId }}
        onSubmitSuccess={() => useOptions.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa tùy chọn"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useOptions.desc?.dataSource?.option_column || "Chi tiết";

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
        { title: "Tùy chọn", path: "/app/system/options" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
