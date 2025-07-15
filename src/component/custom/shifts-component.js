// path: @/component/custom/shifts-component.js

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
  ProFormSelect,
  ProFormTextArea,
  ProFormTimePicker,
} from "@ant-design/pro-form";
import { renderColumns } from "@/lib/util/render-util";

export function ShiftsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/shifts", params, sort, filter)
      }
    />
  );
}

export function ShiftsDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/shifts/${params?.id}`)}
    />
  );
}

export function ShiftsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/shifts", values)}
    />
  );
}

export function ShiftsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/shifts/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/shifts/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/shifts/${params?.id}`)}
    />
  );
}

export function ShiftsColumns(params, displayConfig = []) {
  const { shiftStatus } = params || {};

  const columns = [
    {
      title: "Tên ca học",
      dataIndex: "shift_name",
      key: "shift_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Trạng thái",
      dataIndex: "shift_status_id",
      key: "shift_status_id",
      valueType: "select",
      valueEnum: shiftStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "shift_start_time",
      key: "shift_start_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "shift_end_time",
      key: "shift_end_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
    },
    {
      title: "Mô tả",
      dataIndex: "shift_desc",
      key: "shift_desc",
      valueType: "textarea",
      search: false,
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function ShiftsFields(params) {
  const { shiftStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="shift_name"
          label="Tên ca học"
          placeholder="Nhập Tên ca học"
          rules={[{ required: true }]}
          colProps={{ sm: 12 }}
        />
        <ProFormSelect
          name="shift_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          rules={[{ required: true }]}
          colProps={{ sm: 12 }}
          options={shiftStatus?.options || []}
        />
        <ProFormTimePicker
          name="shift_start_time"
          label="Giờ bắt đầu"
          placeholder="Nhập Giờ bắt đầu"
          rules={[{ required: true }]}
          fieldProps={{ format: "HH:mm" }}
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormTimePicker
          name="shift_end_time"
          label="Giờ kết thúc"
          placeholder="Nhập Giờ kết thúc"
          rules={[{ required: true }]}
          fieldProps={{ format: "HH:mm" }}
          colProps={{ xs: 12 }}
          width="100%"
        />
        <ProFormTextArea
          name="shift_desc"
          label="Mô tả"
          placeholder="Nhập mô tả ca học"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
