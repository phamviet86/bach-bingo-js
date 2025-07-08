// path: @/component/custom/options-components.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText } from "@ant-design/pro-form";

export function OptionsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/options", params, sort, filter)
      }
    />
  );
}

export function OptionsDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/options/${params?.id}`)}
    />
  );
}

export function OptionsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/options", values)}
    />
  );
}

export function OptionsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/options/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/options/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/options/${params?.id}`)}
    />
  );
}

export function OptionsColumns(params) {
  const {} = params || {};

  return [
    {
      title: "Bảng",
      dataIndex: "option_table",
      valueType: "text",
    },
    {
      title: "Cột",
      dataIndex: "option_column",
      valueType: "text",
    },
    {
      title: "Nhãn",
      dataIndex: "option_label",
      valueType: "text",
    },
    {
      title: "Màu Sắc",
      dataIndex: "option_color",
      valueType: "text",
    },
    {
      title: "Nhóm",
      dataIndex: "option_group",
      valueType: "text",
    },
  ];
}

export function OptionsFields(params) {
  const {} = params || {};

  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="option_table"
          label="Bảng"
          placeholder="Nhập tên bảng"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="option_column"
          label="Cột"
          placeholder="Nhập tên cột"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="option_label"
          label="Nhãn"
          placeholder="Nhập nhãn"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="option_color"
          label="Màu Sắc"
          placeholder="Nhập màu sắc"
        />
        <ProFormText
          name="option_group"
          label="Nhóm"
          placeholder="Nhập tên nhóm"
        />
      </ProForm.Group>
    </>
  );
}
