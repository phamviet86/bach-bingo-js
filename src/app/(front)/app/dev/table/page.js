"use client";

import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef } from "react";
import { AntTable } from "@/component/common";
import { useTable } from "@/component/hook";

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

const columns = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "Title",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    tooltip: "Long titles will be automatically collapsed",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "This field is required",
        },
      ],
    },
  },
  {
    disable: true,
    title: "Status",
    dataIndex: "state",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "Very Long".repeat(50) },
      open: {
        text: "Unresolved",
        status: "Error",
      },
      closed: {
        text: "Resolved",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "In Progress",
        status: "Processing",
      },
    },
  },
  {
    disable: true,
    title: "Labels",
    dataIndex: "labels",
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "Created At",
    key: "showTime",
    dataIndex: "created_at",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    valueType: "dateRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: "Actions",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        Edit
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        View
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "Copy" },
          { key: "delete", name: "Delete" },
        ]}
      />,
    ],
  },
];

export default function TablePage() {
  const tableHook = useTable();

  const handleDataRequest = async (params, sort, filter) => {
    console.log(sort, filter);
    await waitTime(2000);

    // Mock data request - replace with your actual API call
    const mockData = {
      success: true,
      data: [],
      total: 0,
    };

    return mockData;
  };

  const toolBarElements = [
    <Button
      key="button"
      icon={<PlusOutlined />}
      onClick={() => {
        tableHook.tableRef.current?.reload();
      }}
      type="primary"
    >
      New
    </Button>,
    <Dropdown
      key="menu"
      menu={{
        items: [
          {
            label: "1st item",
            key: "1",
          },
          {
            label: "2nd item",
            key: "2",
          },
          {
            label: "3rd item",
            key: "3",
          },
        ],
      }}
    >
      <Button>
        <EllipsisOutlined />
      </Button>
    </Dropdown>,
  ];

  return (
    <AntTable
      variant="drawer"
      trigger={<Button type="primary">Open Table</Button>}
      columns={columns}
      tableHook={tableHook}
      onRequest={handleDataRequest}
      title="Advanced Table"
      extra={toolBarElements}
      showSearch={false}
      showOptions={true}
      showPagination={true}
      syncToUrl={true}
      modalProps={{ title: "ModalTable" }}
    />
  );
}
``;
