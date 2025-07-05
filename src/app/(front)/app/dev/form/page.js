"use client";

import { useState } from "react";
import { Button, Space, Card, Typography, Divider, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import { DrawerForm } from "@/component/common";
import { useForm } from "@/component/hook";

const { Title, Paragraph } = Typography;

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    role: "admin",
    bio: "System administrator",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    role: "user",
    bio: "Regular user",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-123-4567",
    role: "moderator",
    bio: "Content moderator",
  },
];

// Simulate API delay
const waitTime = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
const mockApiService = {
  async getUser(id) {
    await waitTime();
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return {
      success: true,
      message: "User loaded successfully",
      data: [user],
    };
  },

  async createUser(userData) {
    await waitTime();
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return {
      success: true,
      message: "User created successfully",
      data: [newUser],
    };
  },

  async updateUser(userData) {
    await waitTime();
    const index = mockUsers.findIndex((u) => u.id === userData.id);
    if (index === -1) throw new Error("User not found");

    mockUsers[index] = { ...mockUsers[index], ...userData };
    return {
      success: true,
      message: "User updated successfully",
      data: [mockUsers[index]],
    };
  },

  async deleteUser(id) {
    await waitTime();
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");

    const deletedUser = mockUsers.splice(index, 1)[0];
    return {
      success: true,
      message: "User deleted successfully",
      data: [deletedUser],
    };
  },
};

export default function DrawerFormDemo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(mockUsers);
  const formHook = useForm();

  // Form fields configuration
  const formFields = (
    <>
      <ProFormText
        name="name"
        label="Full Name"
        placeholder="Enter full name"
        rules={[
          { required: true, message: "Name is required" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
        fieldProps={{
          prefix: <UserOutlined />,
        }}
      />

      <ProFormText
        name="email"
        label="Email Address"
        placeholder="Enter email address"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email" },
        ]}
        fieldProps={{
          prefix: <MailOutlined />,
        }}
      />

      <ProFormText
        name="phone"
        label="Phone Number"
        placeholder="Enter phone number"
        rules={[{ required: true, message: "Phone is required" }]}
        fieldProps={{
          prefix: <PhoneOutlined />,
        }}
      />

      <ProFormSelect
        name="role"
        label="Role"
        placeholder="Select user role"
        rules={[{ required: true, message: "Role is required" }]}
        options={[
          { label: "Admin", value: "admin" },
          { label: "Moderator", value: "moderator" },
          { label: "User", value: "user" },
        ]}
      />

      <ProFormTextArea
        name="bio"
        label="Biography"
        placeholder="Enter user biography"
        fieldProps={{
          rows: 4,
          maxLength: 500,
          showCount: true,
        }}
      />

      <ProFormDatePicker
        name="joinDate"
        label="Join Date"
        placeholder="Select join date"
      />
    </>
  );

  // Event handlers
  const handleCreateUser = () => {
    setSelectedUser(null);
    formHook.setTitle("Create New User");
    formHook.setRequestParams(undefined);
    formHook.setDeleteParams(undefined);
    formHook.open();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    formHook.setTitle(`Edit User: ${user.name}`);
    formHook.setRequestParams({ id: user.id });
    formHook.setDeleteParams(user.id);
    formHook.open();
  };

  const handleDataRequest = async (params) => {
    if (!params?.id) return { success: true, data: [{}] };
    return await mockApiService.getUser(params.id);
  };

  const handleDataSubmit = async (values) => {
    if (selectedUser) {
      // Update existing user
      const result = await mockApiService.updateUser({
        ...values,
        id: selectedUser.id,
      });
      setUserList((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? result.data[0] : user
        )
      );
      return result;
    } else {
      // Create new user
      const result = await mockApiService.createUser(values);
      setUserList((prev) => [...prev, result.data[0]]);
      return result;
    }
  };

  const handleDataDelete = async (userId) => {
    const result = await mockApiService.deleteUser(userId);
    setUserList((prev) => prev.filter((user) => user.id !== userId));
    return result;
  };

  const handleSuccess = () => {
    // formHook.close();
    message.success("Operation completed successfully!");
  };

  const handleError = (error) => {
    message.error(error.message || "An error occurred");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>DrawerForm Component Demo</Title>
      <Paragraph>
        This demo showcases the DrawerForm component with full CRUD operations
        including data request, submit, and delete functionalities.
      </Paragraph>

      <Divider />

      <Card title="Actions" style={{ marginBottom: "24px" }}>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Create New User
          </Button>
        </Space>
      </Card>

      <Card title="User List">
        <Space direction="vertical" style={{ width: "100%" }}>
          {userList.map((user) => (
            <Card
              key={user.id}
              size="small"
              actions={[
                <Button
                  key="edit"
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button>,
              ]}
            >
              <Card.Meta
                title={user.name}
                description={
                  <div>
                    <div>
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {user.phone}
                    </div>
                    <div>
                      <strong>Role:</strong> {user.role}
                    </div>
                    {user.bio && (
                      <div>
                        <strong>Bio:</strong> {user.bio}
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          ))}
        </Space>
      </Card>

      <DrawerForm
        title={formHook.title}
        width={600}
        formHook={formHook}
        fields={formFields}
        // Data request handlers
        onDataRequest={handleDataRequest}
        onDataRequestSuccess={handleSuccess}
        onDataRequestError={handleError}
        requestParams={formHook.requestParams}
        // Data submit handlers
        onDataSubmit={handleDataSubmit}
        onDataSubmitSuccess={handleSuccess}
        onDataSubmitError={handleError}
        // Data delete handlers (only for edit mode)
        onDataDelete={selectedUser ? handleDataDelete : undefined}
        onDataDeleteSuccess={handleSuccess}
        onDataDeleteError={handleError}
        deleteParams={formHook.deleteParams}
      />
    </div>
  );
}
