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
  ProFormTimePicker,
} from "@ant-design/pro-form";

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

export function ShiftsColumns(params) {
  const {} = params || {};

  return [
    {
      title: "Tên ca học",
      dataIndex: "shift_name",
      valueType: "text",
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "shift_start_time",
      valueType: "time",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "shift_end_time",
      valueType: "time",
    },
    {
      title: "Trạng thái ca học",
      dataIndex: "shift_status_id",
      valueType: "digit",
    },
    {
      title: "Mô tả ca học",
      dataIndex: "shift_desc",
      valueType: "text",
    },
  ];
}

export function ShiftsFields(params) {
  const {} = params || {};

  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="shift_name"
          label="Tên ca học"
          placeholder="Nhập tên ca học"
          rules={[{ required: true }]}
        />
        <ProFormTimePicker
          name="shift_start_time"
          label="Giờ bắt đầu"
          placeholder="Chọn giờ bắt đầu"
          rules={[{ required: true }]}
        />
        <ProFormTimePicker
          name="shift_end_time"
          label="Giờ kết thúc"
          placeholder="Chọn giờ kết thúc"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="shift_status_id"
          label="Trạng thái ca học"
          placeholder="Nhập trạng thái ca học"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="shift_desc"
          label="Mô tả ca học"
          placeholder="Nhập mô tả ca học"
        />
      </ProForm.Group>
    </>
  );
}
