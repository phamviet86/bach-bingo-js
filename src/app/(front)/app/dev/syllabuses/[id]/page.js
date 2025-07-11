// SYLLABUSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  SyllabusesDesc,
  SyllabusesEdit,
  SyllabusesColumns,
  SyllabusesFields,
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

  // Navigation
  const { navBack } = useNav();
  const { id: syllabusId } = use(params);

  // giáo trình logic hooks
  const useSyllabuses = {
    desc: useDesc(),
    edit: useForm(),
    columns: SyllabusesColumns(),
    fields: SyllabusesFields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useSyllabuses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SyllabusesDesc
        descHook={useSyllabuses.desc}
        columns={useSyllabuses.columns}
        requestParams={{ id: syllabusId }}
        onRequestSuccess={(result) =>
          useSyllabuses.desc.setDataSource(result?.data?.[0])
        }
      />
      <SyllabusesEdit
        formHook={useSyllabuses.edit}
        fields={useSyllabuses.fields}
        requestParams={{ id: syllabusId }}
        deleteParams={{ id: syllabusId }}
        onSubmitSuccess={() => useSyllabuses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa giáo trình"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useSyllabuses.desc?.dataSource?.syllabus_name || "Chi tiết";

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
        { title: "giáo trình", path: "/app/system/syllabuses" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
