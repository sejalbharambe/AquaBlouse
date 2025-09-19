// src/Modals/AddBlouseModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddBlouseModal = ({ visible, onClose, onAdd }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState({
    front: null,
    back: null,
    sleeves: null,
  });

  const handleUpload = async (file, type) => {
    const base64 = await getBase64(file);
    setImages((prev) => ({ ...prev, [type]: base64 }));
    return false; // prevent auto-upload
  };

  const handleFinish = (values) => {
    const newBlouse = {
      id: Date.now(), // unique id
      name: values.name,
      price: `₹${values.price}`,
      description: values.description,
      images, // storing front, back, sleeves
    };
    onAdd(newBlouse);
    form.resetFields();
    setImages({ front: null, back: null, sleeves: null });
    onClose();
  };

  return (
    <Modal title="Add New Blouse" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Uploads at the Top */}
        <Text strong>Upload Blouse Images</Text>

        <Form.Item label="Front View">
          <Upload
            beforeUpload={(file) => handleUpload(file, "front")}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Front Image</Button>
          </Upload>
          {images.front && (
            <img
              src={images.front}
              alt="front"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </Form.Item>

        <Form.Item label="Back View">
          <Upload
            beforeUpload={(file) => handleUpload(file, "back")}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Back Image</Button>
          </Upload>
          {images.back && (
            <img
              src={images.back}
              alt="back"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </Form.Item>

        <Form.Item label="Sleeves View">
          <Upload
            beforeUpload={(file) => handleUpload(file, "sleeves")}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Sleeves Image</Button>
          </Upload>
          {images.sleeves && (
            <img
              src={images.sleeves}
              alt="sleeves"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}
        </Form.Item>

        {/* Other blouse details */}
        <Form.Item
          label="Blouse Name"
          name="name"
          rules={[{ required: true, message: "Please enter blouse name" }]}
        >
          <Input placeholder="Enter blouse name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber placeholder="Enter price" style={{ width: "100%" }} min={100} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter blouse description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Blouse
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlouseModal;
