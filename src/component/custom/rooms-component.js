// path: @/component/custom/rooms-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormDigit } from "@ant-design/pro-form";

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
  const {} = params || {};
  return [
    {
      title: "Tên phòng",
      dataIndex: "room_name",
      valueType: "text",
    },
    {
      title: "Trạng thái phòng",
      dataIndex: "room_status_id",
      valueType: "digit",
    },
    {
      title: "Mô tả phòng",
      dataIndex: "room_desc",
      valueType: "text",
    },
  ];
}

export function RoomsFields(params) {
  const {} = params || {};
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
        />
        <ProFormDigit
          name="room_status_id"
          label="Trạng thái phòng"
          placeholder="Nhập trạng thái phòng (ID)"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="room_desc"
          label="Mô tả phòng"
          placeholder="Nhập mô tả phòng"
        />
      </ProForm.Group>
    </>
  );
}
