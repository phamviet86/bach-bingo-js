// ROOMS LIST PAGE

"use client";

import { Space } from "antd";
import { ToolOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  RoomsTable,
  RoomsCreate,
  RoomsColumns,
  RoomsFields,
} from "@/component/custom";
import { useTable, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";
import { ROOMS_COLUMN } from "@/component/config";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const { roomStatus } = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // Phòng học logic hooks
  const useRooms = {
    table: useTable(),
    create: useForm(),
    columns: RoomsColumns({ roomStatus }, ROOMS_COLUMN),
    fields: RoomsFields({ roomStatus }),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useRooms.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useRooms.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <RoomsTable
        tableHook={useRooms.table}
        columns={useRooms.columns}
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
      <RoomsCreate
        formHook={useRooms.create}
        fields={useRooms.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo phòng học"
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
        { title: "Phòng học" },
      ]}
      title="Danh sách phòng học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
