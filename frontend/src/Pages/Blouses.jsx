// src/Pages/Blouses.jsx
import React, { useState } from "react";
import { Button, Card, Row, Col, Modal, Typography, Carousel, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddBlouseModal from "../Modals/AddBlouseModal";

const { Title, Text } = Typography;

const initialBlouseData = [
  {
    id: 1,
    name: "Elegant Silk Blouse",
    price: "₹1,200",
    description: "Soft silk blouse perfect for weddings and parties.",
    images: {
      front: "https://tse1.mm.bing.net/th/id/OIP.MAtf9oRbLLY9zpyrL9405gHaKL?pid=ImgDet&w=184&h=253&c=7&dpr=1.3&o=7&rm=3",
      back: "https://tse2.mm.bing.net/th/id/OIP.2K2NYkqlQZ_qK5G_4kCqPQHaML?rs=1&pid=ImgDetMain&o=7&rm=3",
      sleeves: "https://tse2.mm.bing.net/th/id/OIP.r7bD_eFbNZwLHhG-IaQIfgHaHO?pid=ImgDet&w=184&h=179&c=7&dpr=1.3&o=7&rm=3",
    },
  },
  {
    id: 2,
    name: "Traditional Red Blouse",
    price: "₹950",
    description: "Classic red blouse with embroidery design.",
    images: {
      front: "https://images.unsplash.com/photo-1591348275204-692e8a54915e?w=500&q=80",
      back: "https://images.unsplash.com/photo-1520962915697-8a46f2eaf1a2?w=500&q=80",
    },
  },
  {
    id: 3,
    name: "Designer Party Blouse",
    price: "₹1,600",
    description: "Trendy blouse with golden border and designer fit.",
    images: {
      front: "https://images.unsplash.com/photo-1591348275291-9b70e94589c7?w=500&q=80",
    },
  },
];


const Blouses = () => {
  const [selectedBlouse, setSelectedBlouse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [blouses, setBlouses] = useState(initialBlouseData);

  const handleCardClick = (blouse) => {
    setSelectedBlouse(blouse);
    setIsModalVisible(true);
  };

  const handleAddBlouse = (newBlouse) => {
    setBlouses([...blouses, newBlouse]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBlouse(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Top Bar with Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Blouse
        </Button>
      </div>

      {/* Cards Grid */}
      <Row gutter={[16, 16]}>
        {blouses.map((blouse) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blouse.id}>
            <Card
              hoverable
              cover={<img alt={blouse.name} src={blouse.images.front} />}
              onClick={() => handleCardClick(blouse)}
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <Card.Meta title={blouse.name} description={blouse.price} />

              {/* Thumbnails Row */}
              <Space style={{ marginTop: 10 }}>
                {blouse.images.front && (
                  <img
                    src={blouse.images.front}
                    alt="Front"
                    style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                  />
                )}
                {blouse.images.back && (
                  <img
                    src={blouse.images.back}
                    alt="Back"
                    style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                  />
                )}
                {blouse.images.sleeves && (
                  <img
                    src={blouse.images.sleeves}
                    alt="Sleeves"
                    style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                  />
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Blouse Details */}
      <Modal
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        title="Blouse Details"
      >
        {selectedBlouse && (
          <div style={{ textAlign: "center" }}>
            {/* Carousel for all views */}
           {selectedBlouse.images ? (
  <Carousel autoplay>
    {selectedBlouse.images.front && (
      <div>
        <img src={selectedBlouse.images.front} alt="Front" />
        <Text type="secondary">Front View</Text>
      </div>
    )}
    {selectedBlouse.images.back && (
      <div>
        <img src={selectedBlouse.images.back} alt="Back" />
        <Text type="secondary">Back View</Text>
      </div>
    )}
    {selectedBlouse.images.sleeves && (
      <div>
        <img src={selectedBlouse.images.sleeves} alt="Sleeves" />
        <Text type="secondary">Sleeves View</Text>
      </div>
    )}
  </Carousel>
) : (
  <img
    src={selectedBlouse.image}
    alt={selectedBlouse.name}
    style={{ width: "100%", borderRadius: "10px" }}
  />
)}


            <Title level={4} style={{ marginTop: 15 }}>{selectedBlouse.name}</Title>
            <Text strong style={{ display: "block", marginBottom: 10 }}>
              {selectedBlouse.price}
            </Text>
            <Text>{selectedBlouse.description}</Text>

            <div style={{ marginTop: 20 }}>
              <Button type="primary" style={{ marginRight: 10 }}>
                Add to Cart
              </Button>
              <Button type="dashed">Customize Design</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal for Adding New Blouse */}
      <AddBlouseModal 
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddBlouse}
      />
    </div>
  );
};

export default Blouses;
