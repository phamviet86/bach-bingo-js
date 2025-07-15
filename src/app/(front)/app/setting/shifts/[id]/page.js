// SHIFTS DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  ShiftsDesc,
  ShiftsEdit,
  ShiftsColumns,
  ShiftsFields,
} from "@/component/custom";
import { useDesc, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "../provider";
import { SHIFTS_COLUMN } from "@/component/config";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const { shiftStatus } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: shiftId } = use(params);

  // ca học logic hooks
  const useShifts = {
    desc: useDesc(),
    edit: useForm(),
    columns: ShiftsColumns({ shiftStatus }, SHIFTS_COLUMN),
    fields: ShiftsFields({ shiftStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useShifts.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ShiftsDesc
        descHook={useShifts.desc}
        columns={useShifts.columns}
        requestParams={{ id: shiftId }}
        onRequestSuccess={(result) =>
          useShifts.desc.setDataSource(result?.data?.[0])
        }
      />
      <ShiftsEdit
        formHook={useShifts.edit}
        fields={useShifts.fields}
        requestParams={{ id: shiftId }}
        deleteParams={{ id: shiftId }}
        onSubmitSuccess={() => useShifts.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa ca học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useShifts.desc?.dataSource?.shift_name || "Chi tiết";

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
        { title: "Ca học", path: "/app/setting/shifts" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
