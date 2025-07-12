// path: @/component/custom/classes-component.js

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
  ProFormDigit,
  ProFormDatePicker,
} from "@ant-design/pro-form";

export function ClassesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/classes", params, sort, filter)
      }
    />
  );
}

export function ClassesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/classes/${params?.id}`)}
    />
  );
}

export function ClassesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/classes", values)}
    />
  );
}

export function ClassesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/classes/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/classes/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/classes/${params?.id}`)}
    />
  );
}

export function ClassesColumns(params) {
  const {} = params || {};
  return [
    {
      title: "Khóa học",
      dataIndex: "course_id",
      valueType: "text",
    },
    {
      title: "Module",
      dataIndex: "module_id",
      valueType: "text",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "class_start_date",
      valueType: "date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "class_end_date",
      valueType: "date",
    },
    {
      title: "Học phí",
      dataIndex: "class_fee",
      valueType: "digit",
    },
    {
      title: "Tổng học phí",
      dataIndex: "class_total_fee",
      valueType: "digit",
    },
  ];
}

export function ClassesFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="course_id"
          label="Khóa học"
          placeholder="Nhập Khóa học"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="module_id"
          label="Module"
          placeholder="Nhập Module"
          rules={[{ required: true }]}
        />
        <ProFormDatePicker
          name="class_start_date"
          label="Ngày bắt đầu"
          placeholder="Chọn ngày bắt đầu"
        />
        <ProFormDatePicker
          name="class_end_date"
          label="Ngày kết thúc"
          placeholder="Chọn ngày kết thúc"
        />
        <ProFormDigit
          name="class_fee"
          label="Học phí"
          placeholder="Nhập học phí"
        />
        <ProFormDigit
          name="class_total_fee"
          label="Tổng học phí"
          placeholder="Nhập tổng học phí"
        />
      </ProForm.Group>
    </>
  );
}
