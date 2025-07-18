// CLASSES LIST PAGE

"use client";

import { Space } from "antd";
import { BankOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import { ClassesTable, ClassesColumns } from "@/component/custom";
import { useTable } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";
import { CLASSES_COLUMN } from "@/component/config";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const { classStatus } = usePageContext();

  // lớp học logic hooks
  const useClasses = {
    table: useTable(),
    columns: ClassesColumns({ classStatus }, CLASSES_COLUMN),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useClasses.table.reload()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesTable
        tableHook={useClasses.table}
        columns={useClasses.columns}
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
        { title: "Lớp học" },
      ]}
      title="Quản lý lớp học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
