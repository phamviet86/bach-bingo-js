// path: @/component/custom/enrollments-component.js

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

export function EnrollmentsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/enrollments", params, sort, filter)
      }
    />
  );
}

export function EnrollmentsDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
    />
  );
}

export function EnrollmentsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/enrollments", values)}
    />
  );
}

export function EnrollmentsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/enrollments/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/enrollments/${params?.id}`)}
    />
  );
}

export function EnrollmentsColumns(params) {
  const {} = params || {};
  return [
    {
      title: "Người dùng",
      dataIndex: "user_id",
      valueType: "text",
    },
    {
      title: "Module",
      dataIndex: "module_id",
      valueType: "text",
    },
    {
      title: "Lớp",
      dataIndex: "class_id",
      valueType: "text",
    },
    {
      title: "Loại đăng ký",
      dataIndex: "enrollment_type_id",
      valueType: "digit",
    },
    {
      title: "Loại thanh toán",
      dataIndex: "enrollment_payment_type_id",
      valueType: "digit",
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "enrollment_payment_amount",
      valueType: "digit",
    },
    {
      title: "Giảm giá thanh toán",
      dataIndex: "enrollment_payment_discount",
      valueType: "digit",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "enrollment_start_date",
      valueType: "date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "enrollment_end_date",
      valueType: "date",
    },
    {
      title: "Ghi chú giảm giá",
      dataIndex: "enrollment_discount_notes",
      valueType: "text",
    },
    {
      title: "Mô tả đăng ký",
      dataIndex: "enrollment_desc",
      valueType: "text",
    },
  ];
}

export function EnrollmentsFields(params) {
  const {} = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="user_id"
          label="Người dùng"
          placeholder="Nhập người dùng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="module_id"
          label="Module"
          placeholder="Nhập module"
        />
        <ProFormText name="class_id" label="Lớp" placeholder="Nhập lớp" />
        <ProFormDigit
          name="enrollment_type_id"
          label="Loại đăng ký"
          placeholder="Nhập loại đăng ký"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="enrollment_payment_type_id"
          label="Loại thanh toán"
          placeholder="Nhập loại thanh toán"
        />
        <ProFormDigit
          name="enrollment_payment_amount"
          label="Số tiền thanh toán"
          placeholder="Nhập số tiền thanh toán"
        />
        <ProFormDigit
          name="enrollment_payment_discount"
          label="Giảm giá thanh toán"
          placeholder="Nhập giảm giá thanh toán"
        />
        <ProFormDatePicker
          name="enrollment_start_date"
          label="Ngày bắt đầu"
          placeholder="Chọn ngày bắt đầu"
        />
        <ProFormDatePicker
          name="enrollment_end_date"
          label="Ngày kết thúc"
          placeholder="Chọn ngày kết thúc"
        />
        <ProFormText
          name="enrollment_discount_notes"
          label="Ghi chú giảm giá"
          placeholder="Nhập ghi chú giảm giá"
        />
        <ProFormText
          name="enrollment_desc"
          label="Mô tả đăng ký"
          placeholder="Nhập mô tả đăng ký"
        />
      </ProForm.Group>
    </>
  );
}
