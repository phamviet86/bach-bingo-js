# Template code for components

## Template

```javascript
// path: @/component/custom/{table-name}-components.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText } from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

export function {TableName}Table(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/{table-name}", params, sort, filter)
      }
    />
  );
}

export function {TableName}Desc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
    />
  );
}

export function {TableName}Create(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/{table-name}", values)}
    />
  );
}

export function {TableName}Edit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
      onSubmit={(values) =>
        fetchPut(`/api/{table-name}/${values?.id}`, values)
      }
      onDelete={(params) =>
        fetchDelete(`/api/{table-name}/${params?.id}`)
      }
    />
  );
}

export function {TableName}Columns(params, displayConfig = []) {
  const {} = params || {};

  const columns = [
    {
      title: "{Column Header}",
      dataIndex: "{column_name}",
      key: "{column_name}",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    // Repeat the above object for each column...
  ];

  return renderColumns(columns, displayConfig);
}

export function {TableName}Fields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        {/* Repeat this <ProFormText> block for each field */}
        <ProFormText
          name="{field_name}"
          label="{Field Label}"
          placeholder="Nhập {Field Label}"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
```

## Template Placeholders

- {table-name}: kebab-case table (e.g. options, rooms)
- {TableName}: PascalCase table name (singular or plural, consistent with imports)
- {ProFormImports}: comma-separated ProForm field components needed (e.g. ProFormText, ProFormDigit)
- In Columns array: define an object per column with title, dataIndex, valueType.
- In Fields JSX: include `<ProFormText>` for each field with appropriate name, label, placeholder, and validation rules.
- Replace snippet comments with actual column definitions and form fields.
