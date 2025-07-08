"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
  const nav = useNav();
  const useShifts = {
    table: useTable(),
    create: useForm(),
    columns: ShiftsColumns,
    fields: ShiftsFields,
  };

  const pageButton = [
    <AntButton key="reload" onClick={useShifts.table.reload} type="default">
      Tải lại
    </AntButton>,
    <AntButton key="create" onClick={useShifts.create.open} type="primary">
      Thêm ca học
    </AntButton>,
  ];

  const leftColumns = [
    {
      render: (row) => (
        <DetailButton
          key={row.id}
          onClick={() => nav.push(`/dev/shifts/${row.id}`)}
        />
      ),
    },
  ];

  const pageContent = (
    <ProCard boxShadow bordered>
      <ShiftsTable
        {...useShifts.table}
        columns={useShifts.columns()}
        leftColumns={leftColumns}
      />
      <ShiftsCreate
        {...useShifts.create}
        fields={useShifts.fields()}
        onSuccess={useShifts.table.reload}
      />
    </ProCard>
  );

  return (
    <AntPage
      title="Quản lý ca học"
      items={[
        {
          icon: <SettingOutlined />,
          title: "Hệ thống",
        },
        {
          icon: <InfoCircleOutlined />,
          title: "Ca học",
        },
      ]}
      pageButton={pageButton}
    >
      {pageContent}
    </AntPage>
  );
}
