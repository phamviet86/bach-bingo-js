// CLASSES LIST PAGE

"use client";

import { Space } from "antd";
import { BankOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  ClassesTable,
  ClassesCreate,
  ClassesColumns,
  ClassesFields,
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
  const { classStatus } = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // lớp học logic hooks
  const useClasses = {
    table: useTable(),
    create: useForm(),
    columns: ClassesColumns({ classStatus }),
    fields: ClassesFields({ classStatus }),
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
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useClasses.create.open()}
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
      <ClassesCreate
        formHook={useClasses.create}
        fields={useClasses.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo lớp học"
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
        { title: "Lớp học" },
      ]}
      title="Quản lý lớp học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
