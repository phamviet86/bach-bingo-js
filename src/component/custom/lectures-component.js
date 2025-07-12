// path: @/component/custom/lectures-component.js

import { AntTable, AntForm, AntDescriptions } from "@/component/common";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
  fetchOption,
} from "@/lib/util/fetch-util";
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { renderEnum } from "@/lib/util/render-util";

export function LecturesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/lectures", params, sort, filter)
      }
    />
  );
}

export function LecturesDesc(props) {
  return (
    <AntDescriptions
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
    />
  );
}

export function LecturesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/lectures", values)}
    />
  );
}

export function LecturesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/lectures/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/lectures/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/lectures/${params?.id}`)}
    />
  );
}

export function LecturesColumns(params) {
  const { lectureStatus, syllabusId } = params || {};
  return [
    {
      title: "Học phần",
      dataIndex: "module_id",
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
    {
      title: "STT",
      dataIndex: "lecture_no",
      valueType: "digit",
      responsive: ["md"],
      search: false,
    },
    {
      title: "Bài giảng",
      dataIndex: "lecture_name",
      valueType: "text",
      search: false,
      hideInDescriptions: true,
      render: (text, record) =>
        renderEnum(lectureStatus?.valueEnum, record?.lecture_status_id, text),
    },
    {
      title: "Tên bài giảng",
      dataIndex: "lecture_name",
      valueType: "text",
      hidden: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "lecture_status_id",
      valueType: "select",
      valueEnum: lectureStatus?.valueEnum || {},
      hidden: true,
    },
    {
      title: "Mô tả",
      dataIndex: "lecture_desc",
      valueType: "text",
      responsive: ["lg"],
    },
  ];
}

export function LecturesFields(params) {
  const { lectureStatus, syllabusId } = params || {};
  return (
    <>
      <ProForm.Group>
        <ProFormText name="id" label="ID" hidden disabled />
      </ProForm.Group>
      <ProForm.Group>
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
        <ProFormSelect
          name="lecture_status_id"
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          rules={[{ required: true }]}
          options={lectureStatus?.options || []}
          colProps={{ sm: 12 }}
        />
        <ProFormText
          name="lecture_name"
          label="Tên bài giảng"
          placeholder="Nhập Tên bài giảng"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="lecture_no"
          label="Số thứ tự"
          placeholder="Nhập số thứ tự"
        />
        <ProFormTextArea
          name="lecture_desc"
          label="Mô tả"
          placeholder="Nhập mô tả"
          fieldProps={{ autoSize: { minRows: 3, maxRows: 6 } }}
        />
      </ProForm.Group>
    </>
  );
}
