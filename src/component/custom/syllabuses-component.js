// path: @/component/custom/syllabuses-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormDigit } from "@ant-design/pro-form";

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

export function SyllabusesColumns(params) {
  const {} = params || {};
  return [
    {
      title: "Tên giáo trình",
      dataIndex: "syllabus_name",
      valueType: "text",
    },
    {
      title: "Trạng thái giáo trình",
      dataIndex: "syllabus_status_id",
      valueType: "digit",
    },
  ];
}

export function SyllabusesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="syllabus_name"
          label="Tên giáo trình"
          placeholder="Nhập Tên giáo trình"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="syllabus_status_id"
          label="Trạng thái giáo trình"
          placeholder="Nhập Trạng thái giáo trình"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
