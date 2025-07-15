// path: @/component/custom/classes-component.js

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
  ProFormMoney,
  ProFormDatePicker,
  ProFormSelect,
} from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

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

export function ClassesTransfer({ courseId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/modules`, params)}
      onTargetRequest={(params) =>
        fetchList(`/api/courses/${courseId}/classes`, params)
      }
      onAddItem={(keys) =>
        fetchPost(`/api/courses/${courseId}/classes`, {
          moduleIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/courses/${courseId}/classes`, {
          moduleIds: keys,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{
        key: "module_id",
        disabled: ["class_status_id", [], [19]],
      }}
      showSearch={true}
      searchSourceColumns={["syllabus_name_like", "module_name_like"]}
      searchTargetColumns={["syllabus_name_like", "module_name_like"]}
      render={(record) => `${record.syllabus_name} - ${record.module_name}`}
      titles={["Học phần", "Đã gán"]}
      operations={["Thêm", "Xóa"]}
      variant="modal"
      modalProps={{ title: "Lớp học" }}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "học phần",
        itemUnit: "học phần",
        notFoundContent: "Không tìm thấy học phần",
      }}
    />
  );
}

export function ClassesColumns(params, displayConfig = []) {
  const { classStatus } = params || {};

  const columns = [
    {
      title: "Lớp học",
      key: "displayClass",
      search: false,
      hideInDescriptions: true,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>
            {record?.course_name} - {record?.module_name}
          </Typography.Text>
          <Typography.Text type="secondary">
            {record?.syllabus_name}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course_name",
      key: "course_name",
      valueType: "text",
      hidden: true, // Hide course name by default
    },
    {
      title: "Học phần",
      dataIndex: "module_name",
      key: "module_name",
      valueType: "text",
      hidden: true, // Hide module name by default
    },
    {
      title: "Giáo trình",
      dataIndex: "syllabus_name",
      key: "syllabus_name",
      valueType: "text",
      hidden: true, // Hide syllabus name by default
    },
    {
      title: "Trạng thái",
      dataIndex: "class_status_id",
      key: "class_status_id",
      valueType: "select",
      valueEnum: classStatus?.valueEnum || {},
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "class_start_date",
      key: "class_start_date",
      valueType: "date",
      search: false,
      responsive: ["md"],
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "class_end_date",
      key: "class_end_date",
      valueType: "date",
      search: false,
      responsive: ["md"],
    },
    {
      title: "Học phí",
      dataIndex: "class_fee",
      key: "class_fee",
      valueType: "money",
      search: false,
      fieldProps: {
        precision: 0,
      },
      responsive: ["lg"],
    },
    {
      title: "Tổng học phí",
      dataIndex: "class_total_fee",
      key: "class_total_fee",
      valueType: "money",
      search: false,
      fieldProps: {
        precision: 0,
      },
      responsive: ["lg"],
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function ClassesFields(params) {
  const { classStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
        <ProFormText name="course_id" label="ID Khóa học" hidden disabled />
        <ProFormText name="module_id" label="ID học phần" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="course_name"
          label="Khoá học"
          colProps={{ xs: 12 }}
          disabled
        />
        <ProFormSelect
          name="class_status_id"
          label="Trạng thái"
          colProps={{ xs: 12 }}
          options={classStatus?.options || []}
          disabled
        />
        <ProFormText
          name="syllabus_name"
          label="Giáo trình"
          colProps={{ xs: 12 }}
          disabled
        />
        <ProFormText
          name="module_name"
          label="Học phần"
          colProps={{ xs: 12 }}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          name="class_start_date"
          label="Ngày bắt đầu"
          placeholder="Chọn ngày bắt đầu"
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormDatePicker
          name="class_end_date"
          label="Ngày kết thúc"
          placeholder="Chọn ngày kết thúc"
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormMoney
          name="class_fee"
          label="Học phí"
          placeholder="Nhập học phí"
          locale="vn-VN"
          width="100%"
          colProps={{ xs: 12 }}
        />
        <ProFormMoney
          name="class_total_fee"
          label="Tổng học phí"
          placeholder="Nhập tổng học phí"
          locale="vn-VN"
          width="100%"
          colProps={{ xs: 12 }}
        />
      </ProForm.Group>
    </>
  );
}

// columns for classes tab in courses

export function ClassesTabColumns(params, displayConfig = []) {
  const { classStatus } = params || {};

  const columns = [
    {
      title: "Học phần",
      search: false,
      hideInDescriptions: true,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record?.module_name}</Typography.Text>
          <Typography.Text type="secondary">
            {record?.syllabus_name}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course_name",
      valueType: "text",
      hidden: true, // Hide course name by default
    },
    {
      title: "Học phần",
      dataIndex: "module_name",
      valueType: "text",
      hidden: true, // Hide module name by default
    },
    {
      title: "Giáo trình",
      dataIndex: "syllabus_name",
      valueType: "text",
      hidden: true, // Hide syllabus name by default
    },
    {
      title: "Trạng thái",
      dataIndex: "class_status_id",
      valueType: "select",
      valueEnum: classStatus?.valueEnum || {},
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "class_start_date",
      valueType: "date",
      search: false,
      responsive: ["md"],
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "class_end_date",
      valueType: "date",
      search: false,
      responsive: ["md"],
    },
    {
      title: "Học phí",
      dataIndex: "class_fee",
      valueType: "money",
      search: false,
      fieldProps: {
        precision: 0,
      },
      responsive: ["lg"],
    },
    {
      title: "Tổng học phí",
      dataIndex: "class_total_fee",
      valueType: "money",
      search: false,
      fieldProps: {
        precision: 0,
      },
      responsive: ["lg"],
    },
  ];

  return renderColumns(columns, displayConfig);
}
