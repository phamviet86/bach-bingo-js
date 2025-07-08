# Template code for list page

## Template

```javascript
// {TABLE_NAME_UPPER} LIST PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, DetailButton } from "@/component/common";
import {
  {TableName}Table,
  {TableName}Create,
  {TableName}Columns,
  {TableName}Fields,
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
  const {} = usePageContext();

  // Hooks
  const { navDetail } = useNav();

  // {vnTableName} logic hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => use{TableName}.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
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
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo {vnTableName}"
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
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "{vnTableName}" },
      ]}
      title="Quản lý {vnTableName}"
      extra={pageButton}
      content={pageContent}
    />
  );
}
```

## Template Placeholders

- {TABLE_NAME_UPPER}: e.g. OPTIONS, ROOMS
- {table-name}: kebab-case folder name (not shown in code)
- {TableName}: PascalCase singular/plural base (e.g. Options, Rooms)
- {vnTableName}: Vietnamese label (e.g. tùy chọn, phòng học)
