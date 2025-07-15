// path: @/component/custom/modules-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

export function ModulesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/modules", params, sort, filter)
      }
    />
  );
}

export function ModulesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/modules/${params?.id}`)}
    />
  );
}

export function ModulesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/modules", values)}
    />
  );
}

export function ModulesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/modules/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/modules/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/modules/${params?.id}`)}
    />
  );
}

export function ModulesColumns(params, displayConfig = []) {
  const { moduleStatus } = params || {};

  const columns = [
    {
      title: "Tên học phần",
      dataIndex: "module_name",
      key: "module_name",
      valueType: "text",
    },
    {
      title: "Trạng thái",
      dataIndex: "module_status_id",
      key: "module_status_id",
      valueType: "select",
      valueEnum: moduleStatus?.valueEnum || {},
    },
    {
      title: "Mô tả",
      dataIndex: "module_desc",
      key: "module_desc",
      valueType: "textarea",
      responsive: ["md"],
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function ModulesFields(params) {
  const { moduleStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
        <ProFormText name="syllabus_id" label="ID Giáo trình" disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="module_name"
          label="Tên học phần"
          placeholder="Nhập tên học phần"
          rules={[{ required: true }]}
          colProps={{ sm: 12 }}
        />
        <ProFormSelect
          name="module_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          rules={[{ required: true }]}
          options={moduleStatus?.options || []}
          colProps={{ sm: 12 }}
        />
        <ProFormTextArea
          name="module_desc"
          label="Mô tả"
          placeholder="Nhập mô tả"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
