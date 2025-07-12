// COURSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  CoursesDesc,
  CoursesEdit,
  CoursesColumns,
  CoursesFields,
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
  const {} = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: courseId } = use(params);

  // khóa học logic hooks
  const useCourses = {
    desc: useDesc(),
    edit: useForm(),
    columns: CoursesColumns(),
    fields: CoursesFields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useCourses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <CoursesDesc
        descHook={useCourses.desc}
        columns={useCourses.columns}
        requestParams={{ id: courseId }}
        onRequestSuccess={(result) =>
          useCourses.desc.setDataSource(result?.data?.[0])
        }
      />
      <CoursesEdit
        formHook={useCourses.edit}
        fields={useCourses.fields}
        requestParams={{ id: courseId }}
        deleteParams={{ id: courseId }}
        onSubmitSuccess={() => useCourses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa khóa học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle = useCourses.desc?.dataSource?.course_name || "Chi tiết";

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
        { title: "khóa học", path: "/app/system/courses" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
