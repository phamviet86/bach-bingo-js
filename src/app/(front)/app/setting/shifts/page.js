// SHIFTS LIST PAGE

"use client";

import { Space } from "antd";
import { ToolOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  ShiftsTable,
  ShiftsCreate,
  ShiftsColumns,
  ShiftsFields,
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
  const { shiftStatus } = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // ca học logic hooks
  const useShifts = {
    table: useTable(),
    create: useForm(),
    columns: ShiftsColumns({ shiftStatus }),
    fields: ShiftsFields({ shiftStatus }),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useShifts.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useShifts.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ShiftsTable
        tableHook={useShifts.table}
        columns={useShifts.columns}
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
      <ShiftsCreate
        formHook={useShifts.create}
        fields={useShifts.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo ca học"
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
              <ToolOutlined />
              <span>Thiết lập</span>
            </Space>
          ),
        },
        { title: "Ca học" },
      ]}
      title="Quản lý ca học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
