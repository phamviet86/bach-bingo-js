"use client";

import { EllipsisOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Dropdown } from "antd";

const DemoPage = () => (
  <div
    style={{
      background: "#F5F7FA",
    }}
  >
    <PageContainer
      title="Override PageContainer Title"
      header={{
        // title: "Page Title",
        // ghost: false,
        breadcrumb: {
          items: [
            {
              path: "",
              title: "Level 1 Page",
            },
            {
              path: "",
              title: "Level 2 Page",
            },
            {
              path: "",
              title: "Current Page",
            },
          ],
        },
        extra: [
          <Button key="1">Secondary Button</Button>,
          <Button key="2">Secondary Button</Button>,
          <Button key="3" type="primary">
            Primary Button
          </Button>,
          <Dropdown
            key="dropdown"
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: "Dropdown Menu",
                  key: "1",
                },
                {
                  label: "Dropdown Menu 2",
                  key: "2",
                },
                {
                  label: "Dropdown Menu 3",
                  key: "3",
                },
              ],
            }}
          >
            <Button key="4" style={{ padding: "0 8px" }}>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ],
      }}
      tabBarExtraContent="Test tabBarExtraContent"
      tabList={[
        {
          tab: "Basic Info",
          key: "base",
          closable: false,
        },
        {
          tab: "Detailed Info",
          key: "info",
        },
      ]}
      // tabProps={{
      //   type: "editable-card",
      //   hideAdd: true,
      //   onEdit: (e, action) => console.log(e, action),
      // }}
      footer={[
        <Button key="3">Reset</Button>,
        <Button key="2" type="primary">
          Submit
        </Button>,
      ]}
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }} />
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>
);

DemoPage.displayName = "DemoPage";

export default DemoPage;
