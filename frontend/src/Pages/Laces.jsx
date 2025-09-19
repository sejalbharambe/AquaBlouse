// src/Pages/Laces.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spin, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddLaceModal from "../Modals/AddLaceModal";
import { useDispatch, useSelector } from "react-redux";
import { getLaces } from "../Redux/Slices/DesignSlice";
import { BASE_URL } from "../Redux/API/axiosInstance";

const Laces = () => {
  const dispatch = useDispatch();
  const { laces, loading, error } = useSelector((state) => state.design);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch laces on mount
  useEffect(() => {
    dispatch(getLaces());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      {/* Top Bar with Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Lace
        </Button>
      </div>

      {/* Loading / Error / Data */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : laces.length === 0 ? (
        <Empty description="No laces found" />
      ) : (
        <Row gutter={[16, 16]}>
          {laces.map((lace) => (
            <Col xs={24} sm={12} md={8} lg={6} key={lace._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={lace.name}
                    src={
                      lace.image.startsWith("uploads")
                        ? `${BASE_URL}/${lace.image.replace(/\\/g, "/")}`
                        : lace.image
                    }
                    style={{ borderRadius: 8, height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta
                  title={lace.name}
                  description={`Color: ${lace.color} | Size: ${lace.size}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add Lace Modal */}
      <AddLaceModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        // onAdd is not needed now since Redux handles adding
      />
    </div>
  );
};

export default Laces;
