// path: @/component/custom/modules-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormDigit } from "@ant-design/pro-form";

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

export function ModulesColumns(params) {
  const {} = params || {};
  return [
    {
      title: "Chương trình học",
      dataIndex: "syllabus_id",
      valueType: "text",
    },
    {
      title: "Tên học phần",
      dataIndex: "module_name",
      valueType: "text",
    },
    {
      title: "Trạng thái học phần",
      dataIndex: "module_status_id",
      valueType: "digit",
    },
    {
      title: "Mô tả học phần",
      dataIndex: "module_desc",
      valueType: "text",
    },
  ];
}

export function ModulesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="syllabus_id"
          label="Chương trình học"
          placeholder="Nhập chương trình học"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="module_name"
          label="Tên học phần"
          placeholder="Nhập tên học phần"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="module_status_id"
          label="Trạng thái học phần"
          placeholder="Nhập trạng thái học phần"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="module_desc"
          label="Mô tả học phần"
          placeholder="Nhập mô tả học phần"
        />
      </ProForm.Group>
    </>
  );
}
