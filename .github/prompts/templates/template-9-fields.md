# Template columns and fields for table, form

## Columns

```javascript
import { COLOR_ENUM } from "@/component/config";

export function Columns(params) {
  const { shiftStatus } = params || {};
  return [
    {
      // text
      title: "Tên ca học",
      dataIndex: "shift_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      // select valueEnum
      title: "Trạng thái",
      dataIndex: "shift_status_id",
      valueType: "select",
      valueEnum: shiftStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      // time format
      title: "Giờ bắt đầu",
      dataIndex: "shift_start_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
      responsive: ["md"],
    },
    {
      // time format
      title: "Giờ kết thúc",
      dataIndex: "shift_end_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
      responsive: ["md"],
    },
    {
      // textarea
      title: "Mô tả",
      dataIndex: "shift_desc",
      valueType: "textarea",
      responsive: ["lg"],
    },
    {
      // select with enum
      title: "Màu Sắc",
      dataIndex: "option_color",
      valueType: "select",
      valueEnum: COLOR_ENUM,
    },
  ];
}
```

## Fields

```javascript
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormTimePicker,
} from "@ant-design/pro-form";
import { COLOR_ENUM } from "@/component/config";

export function Fields(params) {
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
        <ProFormSelect
          name="option_color"
          label="Màu Sắc"
          placeholder="Chọn màu sắc"
          valueEnum={COLOR_ENUM}
        />
      </ProForm.Group>
    </>
  );
}
```
