// COURSES LIST PAGE

"use client";

import { Space } from "antd";
import { ToolOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  CoursesTable,
  CoursesCreate,
  CoursesColumns,
  CoursesFields,
} from "@/component/custom";
import { useTable, useForm, useNav } from "@/component/hook";
import { PageProvider, usePageContext } from "./provider";
import { COURSES_COLUMN } from "@/component/config";

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

  // khóa học logic hooks
  const useCourses = {
    table: useTable(),
    create: useForm(),
    columns: CoursesColumns({}, COURSES_COLUMN),
    fields: CoursesFields(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useCourses.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useCourses.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <CoursesTable
        tableHook={useCourses.table}
        columns={useCourses.columns}
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
      <CoursesCreate
        formHook={useCourses.create}
        fields={useCourses.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo khóa học"
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
        { title: "Khóa học" },
      ]}
      title="Danh sách khóa học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
