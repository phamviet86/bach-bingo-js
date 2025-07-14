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
  ProFormMoney,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
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
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } =
    params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
        <ProFormText name="user_id" label="ID Người dùng" disabled />
        <ProFormText name="module_id" label="ID học phần" disabled />
        <ProFormText name="class_id" label="ID lớp" disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="enrollment_status_id"
          label="Trạng thái"
          placeholder="Nhập trạng thái"
          options={enrollmentStatus?.options || []}
          disabled
        />
        <ProFormSelect
          name="enrollment_type_id"
          label="Loại"
          placeholder="Nhập loại"
          options={enrollmentType?.options || []}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="enrollment_payment_type_id"
          label="Thanh toán"
          placeholder="Chọn thanh toán"
          options={enrollmentPaymentType?.options || []}
        />
        <ProFormMoney
          name="enrollment_payment_amount"
          label="Số tiền"
          placeholder="Nhập số tiền"
          locale="vn-VN"
          width="100%"
          colProps={{ xs: 12 }}
        />
        <ProFormDigit
          name="enrollment_payment_discount"
          label="Giảm giá"
          placeholder="Nhập giảm giá"
          colProps={{ xs: 12 }}
        />
        <ProFormTextArea
          name="enrollment_discount_notes"
          label="Ghi chú giảm giá"
          placeholder="Nhập ghi chú"
          fieldProps={{ autoSize: { minRows: 1, maxRows: 3 } }}
        />
        <ProFormDatePicker
          name="enrollment_start_date"
          label="Ngày bắt đầu"
          placeholder="Chọn ngày bắt đầu"
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormDatePicker
          name="enrollment_end_date"
          label="Ngày kết thúc"
          placeholder="Chọn ngày kết thúc"
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormTextArea
          name="enrollment_desc"
          label="Mô tả"
          placeholder="Nhập mô tả"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
