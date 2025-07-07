"use client";

import React from "react";
import { Button, Card, Space, Typography, Divider } from "antd";
import { AntSteps } from "@/component/common/steps";
import { useSteps } from "@/component/hook";

const { Title, Text } = Typography;

export default function StepTestPage() {
  // Hooks for modal and drawer variants
  const modalHook = useSteps();
  const drawerHook = useSteps();

  // Sample steps configuration
  const sampleSteps = [
    {
      title: "Bước 1",
      description: "Nhập thông tin cơ bản",
      content: (
        <Card>
          <Title level={4}>Thông tin cơ bản</Title>
          <Text>
            Đây là nội dung của bước 1. Người dùng có thể nhập các thông tin cơ
            bản ở đây.
          </Text>
        </Card>
      ),
    },
    {
      title: "Bước 2",
      description: "Xác nhận thông tin",
      content: (
        <Card>
          <Title level={4}>Xác nhận thông tin</Title>
          <Text>
            Đây là nội dung của bước 2. Người dùng xem lại và xác nhận thông tin
            đã nhập.
          </Text>
        </Card>
      ),
    },
    {
      title: "Bước 3",
      description: "Hoàn tất",
      content: (
        <Card>
          <Title level={4}>Hoàn tất</Title>
          <Text>
            Đây là bước cuối cùng. Tất cả thông tin đã được xử lý thành công.
          </Text>
        </Card>
      ),
    },
  ];

  // Handler functions
  const handleComplete = async () => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "Đã hoàn thành thành công!" };
  };

  const handleCompleteError = (error) => {
    console.error("Complete error:", error);
  };

  const handleCompleteSuccess = (result) => {
    console.log("Complete success:", result);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>AntSteps Component Test</Title>
      <Text type="secondary">
        Trang test để kiểm tra component AntSteps với các variant khác nhau
      </Text>

      <Divider />

      {/* Page Variant */}
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="Page Variant" style={{ marginBottom: "24px" }}>
          <Text>Steps hiển thị trực tiếp trên trang:</Text>
          <Divider />
          <AntSteps
            variant="page"
            steps={sampleSteps}
            onComplete={handleComplete}
            onCompleteError={handleCompleteError}
            onCompleteSuccess={handleCompleteSuccess}
            showCompleteMessage={true}
          />
        </Card>

        {/* Modal and Drawer Triggers */}
        <Card title="Modal & Drawer Variants">
          <Space size="middle">
            <AntSteps
              variant="modal"
              steps={sampleSteps}
              stepsHook={modalHook}
              onComplete={handleComplete}
              onCompleteError={handleCompleteError}
              onCompleteSuccess={handleCompleteSuccess}
              modalProps={{
                title: "Steps trong Modal",
                width: 800,
              }}
              trigger={<Button type="primary">Mở Modal Steps</Button>}
            />

            <AntSteps
              variant="drawer"
              steps={sampleSteps}
              stepsHook={drawerHook}
              onComplete={handleComplete}
              onCompleteError={handleCompleteError}
              onCompleteSuccess={handleCompleteSuccess}
              drawerProps={{
                title: "Steps trong Drawer",
                width: 600,
                placement: "right",
              }}
              trigger={<Button>Mở Drawer Steps</Button>}
              direction="vertical"
            />
          </Space>
        </Card>

        {/* Test Cases */}
        <Card title="Test Cases">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Text strong>Các tính năng đã test:</Text>
            <ul>
              <li>✅ Page variant - Steps hiển thị trực tiếp trên trang</li>
              <li>✅ Modal variant - Steps trong Modal với trigger button</li>
              <li>✅ Drawer variant - Steps trong Drawer với trigger button</li>
              <li>✅ Navigation buttons (Quay lại, Tiếp theo, Hoàn tất)</li>
              <li>✅ Cancel functionality</li>
              <li>✅ Complete handler với async operation</li>
              <li>✅ Success và Error callbacks</li>
              <li>✅ Message notifications</li>
              <li>✅ Step content rendering</li>
              <li>✅ Custom modal và drawer props</li>
            </ul>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
