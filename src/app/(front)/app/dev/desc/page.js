"use client";

import { useState } from "react";
import { Button, Space, Card, Divider } from "antd";
import {
  EyeOutlined,
  FileTextOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { AntDescriptions } from "@/component/common/descriptions";
import { useDesc } from "@/component/hook";

export default function DescTestPage() {
  // ========== Hooks ==========
  const modalDescHook = useDesc();
  const drawerDescHook = useDesc();

  // ========== Sample Data ==========
  const [sampleData, setSampleData] = useState({
    id: "USER_001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    location: "San Francisco, CA",
    joinDate: "2022-03-15",
    status: "Active",
    manager: "Jane Smith",
    salary: "$120,000",
    projects: "React Dashboard, API Gateway",
  });

  // ========== Mock Data Request Function ==========
  const mockDataRequest = async (params) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Request params:", params);

    // Simulate successful response
    return {
      success: true,
      message: "Data loaded successfully",
      data: [sampleData],
    };
  };

  // ========== Event Handlers ==========
  const handleRequestSuccess = (result) => {
    console.log("Request successful:", result);
  };

  const handleRequestError = (error) => {
    console.error("Request error:", error);
  };

  // ========== Description Columns Configuration ==========
  const descriptionColumns = [
    {
      title: "Basic Information",
      dataIndex: "basicInfo",
      children: [
        {
          title: "ID",
          dataIndex: "id",
          copyable: true,
        },
        {
          title: "Full Name",
          dataIndex: "name",
          ellipsis: true,
        },
        {
          title: "Email",
          dataIndex: "email",
          copyable: true,
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
      ],
    },
    {
      title: "Work Information",
      dataIndex: "workInfo",
      children: [
        {
          title: "Department",
          dataIndex: "department",
          valueType: "text",
        },
        {
          title: "Position",
          dataIndex: "position",
        },
        {
          title: "Manager",
          dataIndex: "manager",
        },
        {
          title: "Join Date",
          dataIndex: "joinDate",
          valueType: "date",
        },
      ],
    },
    {
      title: "Additional Details",
      dataIndex: "additionalInfo",
      children: [
        {
          title: "Status",
          dataIndex: "status",
          valueType: "select",
          valueEnum: {
            Active: { text: "Active", status: "Success" },
            Inactive: { text: "Inactive", status: "Default" },
            Suspended: { text: "Suspended", status: "Error" },
          },
        },
        {
          title: "Location",
          dataIndex: "location",
        },
        {
          title: "Salary",
          dataIndex: "salary",
          valueType: "money",
        },
        {
          title: "Projects",
          dataIndex: "projects",
          ellipsis: true,
        },
      ],
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>AntDescriptions Component Test Page</h1>
      <p>
        This page demonstrates all variants of the AntDescriptions component.
      </p>

      <Divider orientation="left">Page Variant (Default)</Divider>
      <Card title="User Profile - Page Variant" style={{ marginBottom: 24 }}>
        <AntDescriptions
          variant="page"
          title="User Information"
          columns={descriptionColumns}
          onRequest={mockDataRequest}
          onRequestSuccess={handleRequestSuccess}
          onRequestError={handleRequestError}
          requestParams={{ userId: "USER_001" }}
          extra={
            <Space>
              <Button type="primary" icon={<EyeOutlined />}>
                View Details
              </Button>
              <Button icon={<FileTextOutlined />}>Export</Button>
            </Space>
          }
        />
      </Card>

      <Divider orientation="left">Modal Variant</Divider>
      <Card title="User Profile - Modal Variant" style={{ marginBottom: 24 }}>
        <p>Click the button below to open the descriptions in a modal:</p>
        <AntDescriptions
          variant="modal"
          title="User Information (Modal)"
          columns={descriptionColumns}
          onRequest={mockDataRequest}
          onRequestSuccess={handleRequestSuccess}
          onRequestError={handleRequestError}
          requestParams={{ userId: "USER_001" }}
          descHook={modalDescHook}
          modalProps={{
            title: "User Profile Details",
            width: 800,
          }}
          trigger={
            <Button type="primary" icon={<ProfileOutlined />}>
              View in Modal
            </Button>
          }
        />
      </Card>

      <Divider orientation="left">Drawer Variant</Divider>
      <Card title="User Profile - Drawer Variant" style={{ marginBottom: 24 }}>
        <p>Click the button below to open the descriptions in a drawer:</p>
        <AntDescriptions
          variant="drawer"
          title="User Information (Drawer)"
          columns={descriptionColumns}
          onRequest={mockDataRequest}
          onRequestSuccess={handleRequestSuccess}
          onRequestError={handleRequestError}
          requestParams={{ userId: "USER_001" }}
          descHook={drawerDescHook}
          drawerProps={{
            title: "User Profile Details",
            width: 600,
            placement: "right",
          }}
          trigger={
            <Button type="primary" icon={<EyeOutlined />}>
              View in Drawer
            </Button>
          }
        />
      </Card>

      <Divider orientation="left">Static Data Example</Divider>
      <Card title="Static Data - No Request Function">
        <AntDescriptions
          variant="page"
          title="Static User Information"
          columns={[
            {
              title: "User ID",
              dataIndex: "id",
              copyable: true,
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              copyable: true,
            },
            {
              title: "Department",
              dataIndex: "department",
            },
            {
              title: "Status",
              dataIndex: "status",
              valueType: "select",
              valueEnum: {
                Active: { text: "Active", status: "Success" },
              },
            },
          ]}
          dataSource={sampleData}
          column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
        />
      </Card>

      <Divider orientation="left">Test Controls</Divider>
      <Card title="Test Controls">
        <Space>
          <Button onClick={() => modalDescHook.open()} type="dashed">
            Open Modal Programmatically
          </Button>
          <Button onClick={() => drawerDescHook.open()} type="dashed">
            Open Drawer Programmatically
          </Button>
          <Button
            onClick={() => {
              setSampleData((prev) => ({
                ...prev,
                name: "Updated Name " + Math.random().toString(36).substr(2, 5),
                status: prev.status === "Active" ? "Inactive" : "Active",
              }));
            }}
            type="dashed"
          >
            Update Sample Data
          </Button>
        </Space>
      </Card>
    </div>
  );
}
