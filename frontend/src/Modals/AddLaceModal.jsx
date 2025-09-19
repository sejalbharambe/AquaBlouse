// src/Modals/AddLaceModal.jsx
import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addLace } from "../Redux/Slices/DesignSlice";

const AddLaceModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [uploadImage, setUploadImage] = useState(null);
  const dispatch = useDispatch();

  const handleUpload = ({ file }) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload images!");
      return;
    }
    setUploadImage(file);
    return false; // prevent auto upload
  };
  

  const handleFinish = (values) => {
    if (!uploadImage) {
      message.error("Please upload an image");
      return;
    }

    // ✅ Prepare FormData for backend
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("color", values.color);
    formData.append("size", values.size);
    formData.append("image", uploadImage);

    dispatch(addLace(formData))
      .unwrap()
      .then(() => {
        message.success("Lace added successfully!");
        form.resetFields();
        setUploadImage(null);
        onClose();
      })
      .catch((err) => {
        message.error(err || "Failed to add lace");
      });
  };

  return (
    <Modal title="Add New Lace" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Lace Name"
          name="name"
          rules={[{ required: true, message: "Please enter lace name" }]}
        >
          <Input placeholder="Golden Lace" />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please enter color" }]}
        >
          <Input placeholder="Gold" />
        </Form.Item>

        <Form.Item
          label="Height (in inches/cm)"
          name="size"
          rules={[{ required: true, message: "Please enter lace height" }]}
        >
          <Input placeholder="e.g., 2 inches / 5 cm" />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false}>
            <Button icon={<PlusOutlined />}>Click to Upload</Button>
          </Upload>
          {uploadImage && (
            <img
              src={URL.createObjectURL(uploadImage)}
              alt="Preview"
              style={{ width: "100%", marginTop: 10, borderRadius: 6 }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Lace
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLaceModal;
