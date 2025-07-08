// path: @/component/custom/rooms-component.js

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
} from "@ant-design/pro-form";

export function RoomsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/rooms", params, sort, filter)
      }
    />
  );
}

export function RoomsDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/rooms/${params?.id}`)}
    />
  );
}

export function RoomsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/rooms", values)}
    />
  );
}

export function RoomsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/rooms/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/rooms/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/rooms/${params?.id}`)}
    />
  );
}

export function RoomsColumns(params) {
  const { roomStatus } = params || {};
  return [
    {
      title: "Tên phòng",
      dataIndex: "room_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Trạng thái",
      dataIndex: "room_status_id",
      valueType: "select",
      valueEnum: roomStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      title: "Mô tả",
      dataIndex: "room_desc",
      valueType: "text",
      responsive: ["md"],
    },
  ];
}

export function RoomsFields(params) {
  const { roomStatus } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="room_name"
          label="Tên phòng"
          placeholder="Nhập tên phòng"
          rules={[{ required: true }]}
          colProps={{ xs: 12 }}
        />
        <ProFormSelect
          name="room_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          options={roomStatus?.options || []}
          rules={[{ required: true }]}
          colProps={{ xs: 12 }}
        />
        <ProFormTextArea
          name="room_desc"
          label="Mô tả"
          placeholder="Nhập mô tả"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
