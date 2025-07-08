"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
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

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}
function PageContent({ params }) {
  const { id: shiftId } = use(params);
  const nav = useNav();
  const useShifts = {
    desc: useDesc(),
    edit: useForm(),
    columns: ShiftsColumns(),
    fields: ShiftsFields(),
  };

  const pageButton = [
    <BackButton key="back" onClick={() => nav.push("/dev/shifts")} />,
    <AntButton key="edit" onClick={useShifts.edit.open} type="primary">
      Chỉnh sửa
    </AntButton>,
  ];

  const pageContent = (
    <ProCard boxShadow bordered>
      <ShiftsDesc
        {...useShifts.desc}
        id={shiftId}
        columns={useShifts.columns()}
      />
      <ShiftsEdit
        {...useShifts.edit}
        id={shiftId}
        fields={useShifts.fields}
        onSuccess={useShifts.desc.reload}
      />
    </ProCard>
  );

  return (
    <AntPage
      title="Chi tiết ca học"
      items={[
        {
          icon: <SettingOutlined />,
          title: "Hệ thống",
          path: "/dev/shifts",
        },
        {
          title: "Ca học",
          path: "/dev/shifts",
        },
        {
          title: shiftId || "Chi tiết",
        },
      ]}
      pageButton={pageButton}
    >
      {pageContent}
    </AntPage>
  );
}
