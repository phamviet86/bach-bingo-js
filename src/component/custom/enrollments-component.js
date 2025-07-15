// path: @/component/custom/enrollments-component.js

import {
  AntTable,
  AntForm,
  AntDescriptions,
  AntTransfer,
} from "@/component/common";
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
import { renderEnrollmentType } from "@/lib/util/render-util";

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

export function ClassEnrollmentsTransfer({
  classId,
  enrollmentTypeId,
  enrollmentPaymentAmount,
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/users`, params)}
      onTargetRequest={(params) =>
        fetchList(`/api/classes/${classId}/enrollments`, params)
      }
      onAddItem={(keys) =>
        fetchPost(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId,
          enrollmentPaymentAmount,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{
        key: "user_id",
        disabled: ["class_status_id", [], [19]],
      }}
      showSearch={true}
      searchSourceColumns={[
        "user_name_like",
        "user_email_like",
        "user_phone_like",
        "user_parent_phone_like",
      ]}
      searchTargetColumns={[
        "user_name_like",
        "user_email_like",
        "user_phone_like",
        "user_parent_phone_like",
      ]}
      render={(record) => `${record.user_name}`}
      titles={["Người dùng", "Đã đăng ký"]}
      operations={["Thêm", "Xóa"]}
      variant="modal"
      modalProps={{ title: "Xếp lớp" }}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "người dùng",
        itemUnit: "người dùng",
        notFoundContent: "Không tìm thấy người dùng",
      }}
    />
  );
}

export function ClassEnrollmentsColumns(params) {
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } =
    params || {};
  return [
    {
      title: "Đăng ký",
      dataIndex: "enrollment_type_id",
      valueType: "select",
      // valueEnum: enrollmentType?.valueEnum || {},
      render: renderEnrollmentType,
    },
    {
      title: "Người dùng",
      dataIndex: "user_name",
      valueType: "text",
    },
    {
      title: "Trạng thái",
      dataIndex: "enrollment_status_id",
      valueType: "select",
      valueEnum: enrollmentStatus?.valueEnum || {},
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
      title: "Loại thanh toán",
      dataIndex: "enrollment_payment_type_id",
      valueType: "select",
      valueEnum: enrollmentPaymentType?.valueEnum || {},
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
      title: "Ghi chú giảm giá",
      dataIndex: "enrollment_discount_notes",
      valueType: "textarea",
      hidden: true,
      search: false,
    },
    {
      title: "Mô tả đăng ký",
      dataIndex: "enrollment_desc",
      valueType: "textarea",
      hidden: true,
      search: false,
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
