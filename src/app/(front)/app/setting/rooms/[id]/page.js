// ROOMS DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  RoomsDesc,
  RoomsEdit,
  RoomsColumns,
  RoomsFields,
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
  const { roomStatus } = usePageContext();

  // Hooks
  const { navBack } = useNav();
  const { id: roomsId } = use(params);

  // Phòng học logic hooks
  const useRooms = {
    desc: useDesc(),
    edit: useForm(),
    columns: RoomsColumns({ roomStatus }),
    fields: RoomsFields({ roomStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useRooms.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <RoomsDesc
        descHook={useRooms.desc}
        columns={useRooms.columns}
        requestParams={{ id: roomsId }}
        onRequestSuccess={(result) =>
          useRooms.desc.setDataSource(result?.data?.[0])
        }
      />
      <RoomsEdit
        formHook={useRooms.edit}
        fields={useRooms.fields}
        requestParams={{ id: roomsId }}
        deleteParams={{ id: roomsId }}
        onSubmitSuccess={() => useRooms.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa phòng học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useRooms.desc?.dataSource?.room_name || "Chi tiết";

  // Render
  return (
    <AntPage
      items={[
        {
          title: (
            <Space>
              <SettingOutlined />
              <span>Thiết lập</span>
            </Space>
          ),
        },
        { title: "Phòng học", path: "/app/setting/rooms" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
