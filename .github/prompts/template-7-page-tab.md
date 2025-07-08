# Template code for tab of page

## Template

```javascript
// {TABLE_NAME_UPPER} TAB OF PAGE

"use client";

import { Space } from "antd";
import { SettingOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  {TableName}Table,
  {TableName}Desc,
  {TableName}Create,
  {TableName}Edit,
  {TableName}Columns,
  {TableName}Fields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Page header buttons (optional)
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // {vnTableName} logic hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: {TableName}Columns(),
    fields: {TableName}Fields(),
  };

  // Tab action buttons
  const {tableName}Button = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => use{TableName}.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => use{TableName}.create.open()}
      />
    </Space>
  );

  // Tab content
  const {tableName}Content = (
    <ProCard boxShadow bordered extra={ {tableName}Button }>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EyeOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  use{TableName}.desc.setParams({ id: record?.id });
                  use{TableName}.desc.open();
                }}
              />
            ),
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EditOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  use{TableName}.edit.setRequestParams({ id: record?.id });
                  use{TableName}.edit.setDeleteParams({ id: record?.id });
                  use{TableName}.edit.open();
                }}
              />
            ),
          },
        ]}
      />
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        title="Tạo {vnTableName}"
        variant="drawer"
      />
      <{TableName}Desc
        descHook={use{TableName}.desc}
        columns={use{TableName}.columns}
        requestParams={use{TableName}.desc.params}
        title="Thông tin {vnTableName}"
        variant="drawer"
        column={1}
      />
      <{TableName}Edit
        formHook={use{TableName}.edit}
        fields={use{TableName}.fields}
        requestParams={use{TableName}.edit.requestParams}
        deleteParams={use{TableName}.edit.deleteParams}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        onDeleteSuccess={() => use{TableName}.table.reload()}
        title="Sửa {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Tab definition
  const {tableName}Tab = {
    key: "{tableName}",
    label: "{vnTableName}",
    children: {tableName}Content,
  };

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
      tabList={[{tableName}Tab]}
    />
  );
}

```

## Templace Placeholders

- {TABLE_NAME_UPPER}: Uppercase table identifier (e.g. OPTIONS, ROOMS)
- {TableName}: PascalCase table component prefix (e.g. Options, Rooms)
- {tableName}: camelCase table identifier (e.g. options, rooms)
- {vnTableName}: Vietnamese table name (e.g. tùy chọn, phòng học)
