"use client";

import { Card, Row, Col, Image, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { AntPage } from "@/component/common";
import { useMemo, useState, useCallback } from "react";

// Available avatar styles
const AVATAR_STYLES = [
  "adventurer",
  "avataaars",
  "big-ears",
  "big-smile",
  "bottts",
  "croodles",
  "lorelei",
  "micah",
  "miniavs",
  "notionists",
  "open-peeps",
  "personas",
  "pixel-art",
];

export default function Page() {
  const [regenerateKey, setRegenerateKey] = useState(0);

  // Generate random UUIDs for image seeds for 24 cards
  const cardSeeds = useMemo(
    () => Array.from({ length: 24 }, () => crypto.randomUUID()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [regenerateKey]
  );

  // Generate card data with unique images and random styles
  const cardData = useMemo(
    () =>
      cardSeeds.map((seed, index) => {
        const randomStyle =
          AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
        return {
          id: index + 1,
          title: `Card ${index + 1}`,
          description: `This is card number ${index + 1} with a unique avatar`,
          imageUrl: `https://api.dicebear.com/9.x/${randomStyle}/svg?seed=${seed}`,
          alt: `Avatar for card ${index + 1}`,
          style: randomStyle,
        };
      }),
    [cardSeeds]
  );

  const handleRegenerate = useCallback(() => {
    setRegenerateKey((prev) => prev + 1);
  }, []);

  const extraButton = (
    <Button type="primary" icon={<ReloadOutlined />} onClick={handleRegenerate}>
      Reload
    </Button>
  );

  return (
    <AntPage
      items={[{ title: "Home", path: "/app" }]}
      title="Home Page"
      extra={extraButton}
    >
      <Row gutter={[16, 16]}>
        {cardData.map((card) => (
          <Col
            key={card.id}
            xs={24} // 1 card per row on extra small screens
            sm={12} // 2 cards per row on small screens
            md={8} // 3 cards per row on medium screens and up
            lg={8}
            xl={6}
            xxl={6}
          >
            <Card hoverable style={{ height: "100%" }} align="middle">
              <Image
                alt={card.alt}
                src={card.imageUrl}
                style={{
                  objectFit: "contain",
                  width: "100%",
                }}
                preview={false}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </AntPage>
  );
}
