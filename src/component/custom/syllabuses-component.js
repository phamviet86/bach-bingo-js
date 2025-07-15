// path: @/component/custom/syllabuses-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

export function SyllabusesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/syllabuses", params, sort, filter)
      }
    />
  );
}

export function SyllabusesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/syllabuses/${params?.id}`)}
    />
  );
}

export function SyllabusesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/syllabuses", values)}
    />
  );
}

export function SyllabusesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/syllabuses/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/syllabuses/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/syllabuses/${params?.id}`)}
    />
  );
}

export function SyllabusesColumns(params, displayConfig = []) {
  const { syllabusStatus } = params || {};

  const columns = [
    {
      title: "Tên giáo trình",
      dataIndex: "syllabus_name",
      key: "syllabus_name",
      valueType: "text",
    },
    {
      title: "Trạng thái",
      dataIndex: "syllabus_status_id",
      key: "syllabus_status_id",
      valueType: "select",
      valueEnum: syllabusStatus?.valueEnum || {},
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function SyllabusesFields(params) {
  const { syllabusStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="syllabus_name"
          label="Tên giáo trình"
          placeholder="Nhập tên giáo trình"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="syllabus_status_id"
          label="Trạng thái"
          placeholder="Chọn Trạng thái"
          rules={[{ required: true }]}
          options={syllabusStatus?.options || []}
        />
      </ProForm.Group>
    </>
  );
}
