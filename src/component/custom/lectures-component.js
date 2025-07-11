// path: @/component/custom/lectures-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormDigit } from "@ant-design/pro-form";

export function LecturesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/lectures", params, sort, filter)
      }
    />
  );
}

export function LecturesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
    />
  );
}

export function LecturesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/lectures", values)}
    />
  );
}

export function LecturesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/lectures/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/lectures/${params?.id}`)}
    />
  );
}

export function LecturesColumns(params) {
  const {} = params || {};
  return [
    {
      title: "Module",
      dataIndex: "module_id",
      valueType: "text",
    },
    {
      title: "Tên bài giảng",
      dataIndex: "lecture_name",
      valueType: "text",
    },
    {
      title: "Trạng thái bài giảng",
      dataIndex: "lecture_status_id",
      valueType: "digit",
    },
    {
      title: "Số thứ tự",
      dataIndex: "lecture_no",
      valueType: "digit",
    },
    {
      title: "Mô tả bài giảng",
      dataIndex: "lecture_desc",
      valueType: "text",
    },
  ];
}

export function LecturesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="module_id"
          label="Module"
          placeholder="Nhập Module"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="lecture_name"
          label="Tên bài giảng"
          placeholder="Nhập Tên bài giảng"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="lecture_status_id"
          label="Trạng thái bài giảng"
          placeholder="Nhập Trạng thái bài giảng"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="lecture_no"
          label="Số thứ tự"
          placeholder="Nhập Số thứ tự"
        />
        <ProFormText
          name="lecture_desc"
          label="Mô tả bài giảng"
          placeholder="Nhập Mô tả bài giảng"
        />
      </ProForm.Group>
    </>
  );
}
