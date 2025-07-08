// OPTIONS TAB OF PAGE

"use client";

import { Space } from "antd";
import {
  SettingOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/component/common";
import {
  OptionsTable,
  OptionsDesc,
  OptionsCreate,
  OptionsEdit,
  OptionsColumns,
  OptionsFields,
} from "@/component/custom";
import { useTable, useDesc, useForm } from "@/component/hook";

export default function Page() {
  // Context
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;

  // Option logic hooks
  const useOptions = {
    table: useTable(),
    create: useForm(),
    desc: useDesc(),
    edit: useForm(),
    columns: OptionsColumns(),
    fields: OptionsFields(),
  };

  // Options buttons
  const optionsButton = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => useOptions.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => useOptions.create.open()}
      />
    </Space>
  );
  // Options content
  const optionsContent = (
    <ProCard boxShadow bordered extra={optionsButton}>
      <OptionsTable
        tableHook={useOptions.table}
        columns={useOptions.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  useOptions.desc.setParams({ id: record?.id });
                  useOptions.desc.open();
                }}
              />
            ),
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EditOutlined />}
                color="primary"
                variant="link"
                onClick={() => {
                  useOptions.edit.setRequestParams({ id: record?.id });
                  useOptions.edit.setDeleteParams({ id: record?.id });
                  useOptions.edit.open();
                }}
              />
            ),
          },
        ]}
      />
      <OptionsCreate
        formHook={useOptions.create}
        fields={useOptions.fields}
        onSubmitSuccess={() => useOptions.table.reload()}
        title="Tạo tùy chọn"
        variant="drawer"
      />
      <OptionsDesc
        descHook={useOptions.desc}
        columns={useOptions.columns}
        requestParams={useOptions.desc.params}
        title="Thông tin tùy chọn"
        variant="drawer"
        column={1}
      />
      <OptionsEdit
        formHook={useOptions.edit}
        fields={useOptions.fields}
        requestParams={useOptions.edit.requestParams}
        deleteParams={useOptions.edit.deleteParams}
        onSubmitSuccess={() => useOptions.table.reload()}
        onDeleteSuccess={() => useOptions.table.reload()}
        title="Sửa tùy chọn"
        variant="drawer"
      />
    </ProCard>
  );

  const optionsTab = {
    key: "options",
    label: "Tùy chọn",
    children: optionsContent,
  };

  // Render
  return (
    <AntPage
      items={[
        {
          title: (
            <Space>
              <SettingOutlined />
              <span>Hệ thống</span>
            </Space>
          ),
        },
        { title: "Tùy chọn" },
      ]}
      title="Tab tùy chọn"
      extra={pageButton}
      content={pageContent}
      tabList={[optionsTab]}
    />
  );
}
