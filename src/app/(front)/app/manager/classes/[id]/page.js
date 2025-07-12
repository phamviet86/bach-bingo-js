// CLASSES DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  ClassesDesc,
  ClassesEdit,
  ClassesColumns,
  ClassesFields,
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
  const { classStatus } = usePageContext();

  // Navigation
  const { navBack } = useNav();
  const { id: classId } = use(params);

  // lớp học logic hooks
  const useClasses = {
    desc: useDesc(),
    edit: useForm(),
    columns: ClassesColumns({ classStatus }),
    fields: ClassesFields({ classStatus }),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => useClasses.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <ClassesDesc
        descHook={useClasses.desc}
        columns={useClasses.columns}
        requestParams={{ id: classId }}
        onRequestSuccess={(result) =>
          useClasses.desc.setDataSource(result?.data?.[0])
        }
      />
      <ClassesEdit
        formHook={useClasses.edit}
        fields={useClasses.fields}
        requestParams={{ id: classId }}
        deleteParams={{ id: classId }}
        onSubmitSuccess={() => useClasses.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa lớp học"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle =
    `${useClasses.desc?.dataSource?.course_name} - ${useClasses.desc?.dataSource?.module_name}` ||
    "Chi tiết";

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
        { title: "Lớp học", path: "/app/manager/classes" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
