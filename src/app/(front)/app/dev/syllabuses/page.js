// SYLLABUSES LIST PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  SyllabusesTable,
  SyllabusesCreate,
  SyllabusesColumns,
  SyllabusesFields,
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
  const {} = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // giáo trình logic hooks
  const useSyllabuses = {
    table: useTable(),
    create: useForm(),
    columns: SyllabusesColumns(),
    fields: SyllabusesFields(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useSyllabuses.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useSyllabuses.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <SyllabusesTable
        tableHook={useSyllabuses.table}
        columns={useSyllabuses.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <DetailButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                id={record?.id}
              />
            ),
          },
        ]}
      />
      <SyllabusesCreate
        formHook={useSyllabuses.create}
        fields={useSyllabuses.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo giáo trình"
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
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "giáo trình" },
      ]}
      title="Quản lý giáo trình"
      extra={pageButton}
      content={pageContent}
    />
  );
}
