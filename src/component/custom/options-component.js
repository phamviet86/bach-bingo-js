// path: @/component/custom/options-components.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/lib/util/fetch-util";
import { ProForm, ProFormText, ProFormSelect } from "@ant-design/pro-form";
import { COLOR_ENUM } from "@/component/config";
import { renderColumns, renderEnum } from "@/lib/util/render-util";

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

export function OptionsColumns(params, displayConfig = []) {
  const {} = params || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      valueType: "text",
      sorter: { multiple: 1 },
      search: false,
      width: 80,
    },
    {
      title: "Bảng",
      dataIndex: "option_table",
      key: "option_table",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Cột",
      dataIndex: "option_column",
      key: "option_column",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Nhãn",
      dataIndex: "option_label",
      key: "option_label",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Màu Sắc",
      dataIndex: "option_color",
      key: "option_color",
      valueType: "select",
      valueEnum: COLOR_ENUM,
      sorter: { multiple: 1 },
    },
    {
      title: "Nhóm",
      dataIndex: "option_group",
      key: "option_group",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      title: "Nhãn",
      key: "displayLabel",
      search: false,
      render: (_, record) =>
        renderEnum(
          COLOR_ENUM,
          record?.option_color,
          record?.option_label,
          "badge"
        ),
    },
  ];

  return renderColumns(columns, displayConfig);
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
        <ProFormSelect
          name="option_color"
          label="Màu Sắc"
          placeholder="Chọn màu sắc"
          valueEnum={COLOR_ENUM}
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
