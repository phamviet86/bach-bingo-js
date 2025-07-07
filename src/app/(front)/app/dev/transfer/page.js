"use client";

import { useState, useRef } from "react";
import { Button, Space, Divider, Typography, Card, Row, Col } from "antd";
import { Transfer } from "@/component/common/transfer";
import { useDialog } from "@/component/hook/useDialog";

const { Title, Text } = Typography;

// Mock data for testing
const mockSourceData = [
  { key: "1", title: "Option 1", description: "Description for option 1" },
  { key: "2", title: "Option 2", description: "Description for option 2" },
  { key: "3", title: "Option 3", description: "Description for option 3" },
  { key: "4", title: "Option 4", description: "Description for option 4" },
  { key: "5", title: "Option 5", description: "Description for option 5" },
  { key: "6", title: "Option 6", description: "Description for option 6" },
  { key: "7", title: "Option 7", description: "Description for option 7" },
  { key: "8", title: "Option 8", description: "Description for option 8" },
];

const mockTargetData = [
  { key: "2", title: "Option 2", description: "Description for option 2" },
  { key: "4", title: "Option 4", description: "Description for option 4" },
];

export default function TransferTestPage() {
  // State for managing selected items
  const [selectedItems, setSelectedItems] = useState(["2", "4"]);

  // Dialog hooks for modal and drawer variants
  const modalTransferHook = useDialog();
  const drawerTransferHook = useDialog();

  // Refs for reloading data
  const pageTransferReloadRef = useRef();
  const modalTransferReloadRef = useRef();
  const drawerTransferReloadRef = useRef();

  // Mock API functions
  const mockSourceRequest = async (params = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredData = mockSourceData;

    // Handle search filtering
    if (params.or) {
      const searchValue = params.or.title || params.or.description || "";
      filteredData = mockSourceData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else if (params.title) {
      filteredData = mockSourceData.filter((item) =>
        item.title.toLowerCase().includes(params.title.toLowerCase())
      );
    }

    return {
      success: true,
      data: filteredData,
      message: "Source data loaded successfully",
    };
  };

  const mockTargetRequest = async (params = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredData = mockTargetData.filter((item) =>
      selectedItems.includes(item.key)
    );

    // Handle search filtering
    if (params.or) {
      const searchValue = params.or.title || params.or.description || "";
      filteredData = filteredData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else if (params.title) {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(params.title.toLowerCase())
      );
    }

    return {
      success: true,
      data: filteredData,
      message: "Target data loaded successfully",
    };
  };

  const mockAddItem = async (keys) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add keys to selected items
    const newSelectedItems = [...new Set([...selectedItems, ...keys])];
    setSelectedItems(newSelectedItems);

    return {
      success: true,
      message: `Added ${keys.length} item(s) successfully`,
    };
  };

  const mockRemoveItem = async (keys) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Remove keys from selected items
    const newSelectedItems = selectedItems.filter((key) => !keys.includes(key));
    setSelectedItems(newSelectedItems);

    return {
      success: true,
      message: `Removed ${keys.length} item(s) successfully`,
    };
  };

  // Custom render function for transfer items
  const renderTransferItem = (record) => (
    <div style={{ padding: "8px 0" }}>
      <div style={{ fontWeight: "bold" }}>{record.title}</div>
      <div style={{ fontSize: "12px", color: "#666" }}>
        {record.description}
      </div>
    </div>
  );

  const handleReloadPageTransfer = () => {
    if (pageTransferReloadRef.current) {
      pageTransferReloadRef.current();
    }
  };

  const handleReloadModalTransfer = () => {
    if (modalTransferReloadRef.current) {
      modalTransferReloadRef.current();
    }
  };

  const handleReloadDrawerTransfer = () => {
    if (drawerTransferReloadRef.current) {
      drawerTransferReloadRef.current();
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Transfer Component Test Page</Title>
      <Text type="secondary">
        This page demonstrates the Transfer component in different variants with
        mock data.
      </Text>

      <Divider />

      {/* Current Selection Display */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Current Selected Items</Title>
        <Text>Selected Keys: {selectedItems.join(", ") || "None"}</Text>
      </Card>

      {/* Page Variant */}
      <Card style={{ marginBottom: "24px" }}>
        <Title level={3}>Page Variant</Title>
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: "16px" }}
        >
          Default transfer component displayed directly in the page.
        </Text>

        <Space style={{ marginBottom: "16px" }}>
          <Button onClick={handleReloadPageTransfer}>
            Reload Page Transfer
          </Button>
        </Space>

        <div style={{ height: "400px" }}>
          <Transfer
            variant="page"
            onSourceRequest={mockSourceRequest}
            sourceParams={{}}
            onTargetRequest={mockTargetRequest}
            targetParams={{}}
            onAddItem={mockAddItem}
            onRemoveItem={mockRemoveItem}
            showSearch={true}
            searchSourceColumns={["title", "description"]}
            searchTargetColumns={["title", "description"]}
            render={renderTransferItem}
            reloadRef={pageTransferReloadRef}
            listStyle={{
              width: "100%",
              height: "350px",
              minHeight: "300px",
            }}
            titles={["Available Options", "Selected Options"]}
          />
        </div>
      </Card>

      {/* Modal and Drawer Variants */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={3}>Modal Variant</Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: "16px" }}
            >
              Transfer component displayed in a modal dialog.
            </Text>

            <Space>
              <Button type="primary" onClick={modalTransferHook.open}>
                Open Modal Transfer
              </Button>
              <Button onClick={handleReloadModalTransfer}>
                Reload Modal Data
              </Button>
            </Space>

            <Transfer
              variant="modal"
              transferHook={{
                reloadRef: modalTransferReloadRef,
                visible: modalTransferHook.visible,
                open: modalTransferHook.open,
                close: modalTransferHook.close,
              }}
              onSourceRequest={mockSourceRequest}
              sourceParams={{}}
              onTargetRequest={mockTargetRequest}
              targetParams={{}}
              onAddItem={mockAddItem}
              onRemoveItem={mockRemoveItem}
              showSearch={true}
              searchSourceColumns={["title", "description"]}
              searchTargetColumns={["title", "description"]}
              render={renderTransferItem}
              modalProps={{
                title: "Modal Transfer Test",
                width: 800,
              }}
              listStyle={{
                width: "100%",
                height: "400px",
                minHeight: "300px",
              }}
              titles={["Available Options", "Selected Options"]}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={3}>Drawer Variant</Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: "16px" }}
            >
              Transfer component displayed in a drawer panel.
            </Text>

            <Space>
              <Button type="primary" onClick={drawerTransferHook.open}>
                Open Drawer Transfer
              </Button>
              <Button onClick={handleReloadDrawerTransfer}>
                Reload Drawer Data
              </Button>
            </Space>

            <Transfer
              variant="drawer"
              transferHook={{
                reloadRef: drawerTransferReloadRef,
                visible: drawerTransferHook.visible,
                open: drawerTransferHook.open,
                close: drawerTransferHook.close,
              }}
              onSourceRequest={mockSourceRequest}
              sourceParams={{}}
              onTargetRequest={mockTargetRequest}
              targetParams={{}}
              onAddItem={mockAddItem}
              onRemoveItem={mockRemoveItem}
              showSearch={true}
              searchSourceColumns={["title", "description"]}
              searchTargetColumns={["title", "description"]}
              render={renderTransferItem}
              drawerProps={{
                title: "Drawer Transfer Test",
                width: 720,
                placement: "right",
              }}
              listStyle={{
                width: "100%",
                height: "500px",
                minHeight: "400px",
              }}
              titles={["Available Options", "Selected Options"]}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Test Instructions */}
      <Card>
        <Title level={4}>Test Instructions</Title>
        <ul>
          <li>
            <strong>Search Testing:</strong> Use the search boxes to filter
            items by title or description
          </li>
          <li>
            <strong>Transfer Testing:</strong> Move items between left and right
            panels using the arrow buttons
          </li>
          <li>
            <strong>Reload Testing:</strong> Use the reload buttons to refresh
            data in each variant
          </li>
          <li>
            <strong>Modal Testing:</strong> Click &quot;Open Modal
            Transfer&quot; to test the modal variant
          </li>
          <li>
            <strong>Drawer Testing:</strong> Click &quot;Open Drawer
            Transfer&quot; to test the drawer variant
          </li>
          <li>
            <strong>Responsive Testing:</strong> Resize the browser window to
            test responsive behavior
          </li>
          <li>
            <strong>Error Simulation:</strong> Check console for any error
            messages during operations
          </li>
        </ul>
      </Card>
    </div>
  );
}
