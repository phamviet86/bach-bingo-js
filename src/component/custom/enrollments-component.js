// path: @/component/custom/enrollments-component.js

import { Space, Typography } from "antd";
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
import { renderEnum } from "@/lib/util/render-util";
import { renderColumns } from "@/lib/util/render-util";

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
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/users`, params)}
      onTargetRequest={(params) => fetchList(`/api/enrollments`, params)}
      onAddItem={(keys) =>
        fetchPost(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{
        key: "user_id",
        disabled: ["enrollment_status_id", [], [32]],
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
      modalProps={{ title: "Thêm đăng ký" }}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "người dùng",
        itemUnit: "người dùng",
        notFoundContent: "Không tìm thấy người dùng",
      }}
    />
  );
}

export function UserEnrollmentsTransfer({
  userId,
  enrollmentTypeId,
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/classes`, params)}
      onTargetRequest={(params) => fetchList(`/api/enrollments/`, params)}
      onAddItem={(keys) =>
        fetchPost(`/api/users/${userId}/enrollments`, {
          classIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/users/${userId}/enrollments`, {
          classIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{
        key: "class_id",
        disabled: ["enrollment_status_id", [], [32]],
      }}
      showSearch={true}
      searchSourceColumns={[
        "course_name_like",
        "module_name_like",
        "syllabus_name_like",
      ]}
      searchTargetColumns={[
        "course_name_like",
        "module_name_like",
        "syllabus_name_like",
      ]}
      render={(record) => `${record.course_name} - ${record.module_name}`}
      titles={["Lớp học", "Đã đăng ký"]}
      operations={["Thêm", "Xóa"]}
      variant="modal"
      modalProps={{ title: "Xếp lớp" }}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "lớp học",
        itemUnit: "lớp học",
        notFoundContent: "Không tìm thấy lớp học",
      }}
    />
  );
}

export function UserWaitingEnrollmentsTransfer({
  userId,
  enrollmentTypeId,
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/modules`, params)}
      onTargetRequest={(params) => fetchList(`/api/enrollments/`, params)}
      onAddItem={(keys) =>
        fetchPost(`/api/users/${userId}/waiting-enrollments`, {
          moduleIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/users/${userId}/waiting-enrollments`, {
          moduleIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{
        key: "module_id",
        disabled: ["enrollment_status_id", [], [31]],
      }}
      showSearch={true}
      searchSourceColumns={["module_name_like", "syllabus_name_like"]}
      searchTargetColumns={["module_name_like", "syllabus_name_like"]}
      render={(record) =>
        `${
          record.syllabus_name
            ? record.syllabus_name
            : record.waiting_syllabus_name
        } - ${
          record.module_name ? record.module_name : record.waiting_module_name
        }`
      }
      titles={["Học phần", "Đã đăng ký"]}
      operations={["Thêm", "Xóa"]}
      variant="modal"
      modalProps={{ title: "Xếp chờ" }}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "học phần",
        itemUnit: "học phần",
        notFoundContent: "Không tìm thấy học phần",
      }}
    />
  );
}

export function EnrollmentsColumns(params, displayConfig = []) {
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } =
    params || {};

  const columns = [
    {
      title: "Khoá học",
      dataIndex: "course_name",
      key: "course_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Giáo trình",
      dataIndex: "syllabus_name",
      key: "syllabus_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Học phần",
      dataIndex: "module_name",
      key: "module_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Giáo trình",
      dataIndex: "waiting_syllabus_name",
      key: "waiting_syllabus_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Học phần",
      dataIndex: "waiting_module_name",
      key: "waiting_module_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Người dùng",
      dataIndex: "user_name",
      key: "user_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Đăng ký",
      dataIndex: "enrollment_type_id",
      key: "enrollment_type_id",
      valueType: "select",
      valueEnum: enrollmentType?.valueEnum || {},
      render: (_, record) =>
        renderEnum(
          enrollmentType?.valueEnum,
          record.enrollment_type_id,
          null,
          "tag"
        ),
      sorter: { multiple: 1 },
    },
    {
      title: "Trạng thái",
      dataIndex: "enrollment_status_id",
      key: "enrollment_status_id",
      valueType: "select",
      valueEnum: enrollmentStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "enrollment_start_date",
      key: "enrollment_start_date",
      valueType: "date",
      sorter: { multiple: 1 },
      search: false,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "enrollment_end_date",
      key: "enrollment_end_date",
      valueType: "date",
      sorter: { multiple: 1 },
      search: false,
    },
    {
      title: "Thanh toán",
      dataIndex: "enrollment_payment_type_id",
      key: "enrollment_payment_type_id",
      valueType: "select",
      valueEnum: enrollmentPaymentType?.valueEnum || {},
      render: (_, record) =>
        renderEnum(
          enrollmentPaymentType?.valueEnum,
          record.enrollment_payment_type_id,
          null,
          "text"
        ),
      sorter: { multiple: 1 },
    },
    {
      title: "Số tiền",
      dataIndex: "enrollment_payment_amount",
      key: "enrollment_payment_amount",
      valueType: "money",
      fieldProps: {
        precision: 0,
      },
      sorter: { multiple: 1 },
      search: false,
    },
    {
      title: "Giảm giá",
      dataIndex: "enrollment_payment_discount",
      key: "enrollment_payment_discount",
      valueType: "digit",
      fieldProps: {
        formatter: (value) => (value ? `${value} %` : ""),
      },
      sorter: { multiple: 1 },
      search: false,
    },
    {
      title: "Ghi chú giảm giá",
      dataIndex: "enrollment_discount_notes",
      key: "enrollment_discount_notes",
      valueType: "textarea",
      search: false,
    },
    {
      title: "Mô tả đăng ký",
      dataIndex: "enrollment_desc",
      key: "enrollment_desc",
      valueType: "textarea",
      search: false,
    },
    {
      title: "Người dùng",
      key: "displayUser",
      search: false,
      render: (_, record) => (
        <Space size={0} direction="vertical">
          <Typography.Text strong>{record.user_name}</Typography.Text>
          {renderEnum(
            enrollmentType?.valueEnum,
            record.enrollment_type_id,
            null,
            "tag"
          )}
        </Space>
      ),
    },
    {
      title: "Lớp học",
      key: "displayClass",
      search: false,
      render: (_, record) => (
        <Space size={0} direction="vertical">
          <Typography.Text strong>
            {record.class_id
              ? `${record.course_name} - ${record.module_name}`
              : `${record.waiting_syllabus_name} - ${record.waiting_module_name}`}
          </Typography.Text>
          <Typography.Text type="secondary">
            {record.class_id ? record.syllabus_name : ""}
          </Typography.Text>
        </Space>
      ),
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function EnrollmentsFields(params) {
  const { enrollmentStatus, enrollmentType, enrollmentPaymentType } =
    params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
        <ProFormText name="user_id" label="ID Người dùng" hidden disabled />
        <ProFormText name="module_id" label="ID học phần" hidden disabled />
        <ProFormText name="class_id" label="ID lớp" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="course_name"
          label="Tên lớp"
          colProps={{ xs: 12 }}
          width="100%"
          disabled
        />
        <ProFormText
          name="module_name"
          label="Học phần"
          colProps={{ xs: 12 }}
          width="100%"
          disabled
        />
        <ProFormText name="user_name" label="Tên người dùng" disabled />
        <ProFormSelect
          name="enrollment_type_id"
          label="Loại"
          placeholder="Nhập loại"
          options={enrollmentType?.options || []}
          colProps={{ xs: 12 }}
          width="100%"
          disabled
        />
        <ProFormSelect
          name="enrollment_status_id"
          label="Trạng thái"
          placeholder="Nhập trạng thái"
          options={enrollmentStatus?.options || []}
          colProps={{ xs: 12 }}
          width="100%"
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
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
          label="Giảm giá (%)"
          placeholder="Nhập giảm giá"
          fieldProps={{ formatter: (value) => (value ? `${value} %` : "") }}
          colProps={{ xs: 12 }}
        />
        <ProFormTextArea
          name="enrollment_discount_notes"
          label="Ghi chú giảm giá"
          placeholder="Nhập ghi chú"
          fieldProps={{ autoSize: { minRows: 1, maxRows: 3 } }}
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
