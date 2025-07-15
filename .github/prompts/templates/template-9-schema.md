# Template columns and fields for table, form

## Columns

```javascript
import { fetchOption } from "@/lib/util/fetch-util";
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormTimePicker,
} from "@ant-design/pro-form";
import { COLOR_ENUM } from "@/component/config";

export function Columns(params, displayConfig = []) {
  const { shiftStatus, syllabusId } = params || {};

  const columns = [
    {
      // text
      title: "Tên ca học",
      dataIndex: "shift_name",
      key: "shift_name",
      valueType: "text",
      sorter: { multiple: 1 },
    },
    {
      // select valueEnum
      title: "Trạng thái",
      dataIndex: "shift_status_id",
      key: "shift_status_id",
      valueType: "select",
      valueEnum: shiftStatus?.valueEnum || {},
      sorter: { multiple: 1 },
    },
    {
      // time format
      title: "Giờ bắt đầu",
      dataIndex: "shift_start_time",
      key: "shift_start_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
      responsive: ["md"],
    },
    {
      // time format
      title: "Giờ kết thúc",
      dataIndex: "shift_end_time",
      key: "shift_end_time",
      valueType: "time",
      fieldProps: { format: "HH:mm" },
      sorter: { multiple: 1 },
      responsive: ["md"],
    },
    {
      // textarea
      title: "Mô tả",
      dataIndex: "shift_desc",
      key: "shift_desc",
      valueType: "textarea",
      sorter: { multiple: 1 },
      responsive: ["lg"],
    },
    {
      // select with enum
      title: "Màu Sắc",
      dataIndex: "option_color",
      key: "option_color",
      valueType: "select",
      valueEnum: COLOR_ENUM,
      sorter: { multiple: 1 },
      responsive: ["xl"],
    },
    {
      // fetch remote options
      title: "Học phần",
      dataIndex: "module_id",
      key: "module_id",
      valueType: "select",
      request: (params) =>
        fetchOption("/api/modules", params, {
          label: "module_name",
          value: "id",
        }),
      params: {
        syllabus_id_e: syllabusId,
      },
      sorter: { multiple: 1 },
    },
  ];

  return renderColumns(columns, displayConfig);
}

export function Fields(params) {
  const { shiftStatus, syllabusId } = params || {};
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
        <ProFormSelect
          name="module_id"
          label="Học phần"
          placeholder="Chọn học phần"
          rules={[{ required: true }]}
          request={(params) =>
            fetchOption("/api/modules", params, {
              label: "module_name",
              value: "id",
            })
          }
          params={{
            syllabus_id_e: syllabusId,
          }}
          colProps={{ sm: 12 }}
        />
      </ProForm.Group>
    </>
  );
}
```
