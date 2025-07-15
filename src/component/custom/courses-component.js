// path: @/component/custom/courses-component.js

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

export function CoursesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/courses", params, sort, filter)
      }
    />
  );
}

export function CoursesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/courses/${params?.id}`)}
    />
  );
}

export function CoursesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/courses", values)}
    />
  );
}

export function CoursesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/courses/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/courses/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/courses/${params?.id}`)}
    />
  );
}

export function CoursesColumns(params, displayConfig = []) {
  const {} = params || {};

  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "course_name",
      key: "course_name",
      valueType: "text",
    },
    {
      title: "Mã khóa học",
      dataIndex: "course_code",
      key: "course_code",
      valueType: "text",
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function CoursesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="course_name"
          label="Tên khóa học"
          placeholder="Nhập Tên khóa học"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="course_code"
          label="Mã khóa học"
          placeholder="Nhập Mã khóa học"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
    </>
  );
}
