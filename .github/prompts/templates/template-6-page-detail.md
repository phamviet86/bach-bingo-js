# Template code for detail page

## Template

```javascript
// {TABLE_NAME_UPPER} DETAIL PAGE

"use client";

import { use } from "react";
import { Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, BackButton } from "@/component/common";
import {
  {TableName}Desc,
  {TableName}Edit,
  {TableName}Columns,
  {TableName}Fields,
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
  const { id: {tableName}Id } = use(params);

  // {vnTableName} logic hooks
  const use{TableName} = {
    desc: useDesc(),
    edit: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Page action buttons
  const pageButton = [
    <BackButton key="back-button" color="default" variant="outlined" />,
    <AntButton
      key="edit-button"
      label="Sửa"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{TableName}Desc
        descHook={use{TableName}.desc}
        columns={use{TableName}.columns}
        requestParams={{ id: {tableName}Id }}
        onRequestSuccess={(result) =>
          use{TableName}.desc.setDataSource(result?.data?.[0])
        }
      />
      <{TableName}Edit
        formHook={use{TableName}.edit}
        fields={use{TableName}.fields}
        requestParams={{ id: {tableName}Id }}
        deleteParams={{ id: {tableName}Id }}
        onSubmitSuccess={() => use{TableName}.desc.reload()}
        onDeleteSuccess={() => navBack()}
        title="Sửa {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Page title
  const pageTitle =
    use{TableName}.desc?.dataSource?.{titleField} || "Chi tiết";

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
        { title: "{vnTableName}", path: "/app/system/{table-name}" },
        { title: pageTitle },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
```

## Template Placeholders

- {TABLE_NAME_UPPER}: uppercase table identifier (e.g. OPTIONS, ROOMS)
- {table-name}: kebab-case table folder (e.g. options, rooms)
- {TableName}: PascalCase table name (e.g. Option, Room)
- {vnTableName}: Vietnamese singular label (e.g. tùy chọn, phòng học)
- {tableName}: camelCase table name for ID param (e.g. option, room)
- {titleField}: field key to use for page title (e.g. option_label, room_name)
