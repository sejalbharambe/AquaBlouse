// src/Pages/Design.jsx
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
  Card,
  Collapse,
} from "antd";
import { useDispatch } from "react-redux";
import { addBlouse, getLaces } from "../Redux/Slices/DesignSlice";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const Design = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [images, setImages] = useState([]); // [{file, label}]
  const [laces, setLaces] = useState([]);

  // ✅ Fetch laces on mount
  useEffect(() => {
    dispatch(getLaces())
      .unwrap()
      .then((res) => setLaces(res))
      .catch((err) => console.error("Get Laces Error:", err));
  }, [dispatch]);

  // ✅ Handle image upload (multiple)
  const handleUpload = ({ fileList }) => {
    setImages(
      fileList.map((f, i) => {
        const file = f.originFileObj || f;

        return {
          file,
          label: images[i]?.label || "",
          url: f.url || (file instanceof File ? URL.createObjectURL(file) : ""), // preview
          name: f.name || `image-${i}`,
        };
      }) 
    );
  };

  // ✅ Handle label change for each image
  const handleImageLabelChange = (index, value) => {
    const newImages = [...images];
    newImages[index].label = value;
    setImages(newImages);
  };

  // ✅ Submit blouse
  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("color", values.color);
    formData.append("fabricType", values.fabricType);

    // multiple laces
    if (values.laces && values.laces.length > 0) {
      values.laces.forEach((laceId) => {
        formData.append("laces", laceId);
      });
    }

    // multiple images with labels
    images.forEach((img) => {
      formData.append("images", img.file);
      formData.append("imageLabels", img.label || "");
    });

    dispatch(addBlouse(formData))
      .unwrap()
      .then(() => {
        message.success("Blouse added successfully!");
        form.resetFields();
        setImages([]);
      })
      .catch((err) => {
        console.error("Add Blouse Error:", err);
        message.error("Failed to add blouse");
      });
  };

  return (
    <Card
      title="Add New Blouse Design"
      style={{ margin: 20, borderRadius: 12, padding: "24px" }}
    >
      <Row gutter={24}>
        {/* Left Side: Form */}
        <Col xs={24} md={14}>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Collapse accordion defaultActiveKey={["1"]} bordered={false}>
              {/* Basic Info */}
              <Panel header="Basic Info" key="1">
                <Form.Item
                  label="Blouse Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter blouse name" }]}
                >
                  <Input placeholder="Elegant Silk Blouse" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: "Please enter description" }]}
                >
                  <TextArea rows={3} placeholder="Fabric, style, embroidery..." />
                </Form.Item>

                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please enter Category" }]}
                >
                  <Input placeholder="Bridal or Party wear" />
                </Form.Item>
              </Panel>

              {/* Pricing & Color */}
              <Panel header="Pricing & Color" key="2">
                <Form.Item
                  label="Base Price"
                  name="price"
                  rules={[{ required: true, message: "Please enter price" }]}
                >
                  <InputNumber style={{ width: "100%" }} min={100} placeholder="₹" />
                </Form.Item>

                <Form.Item
                  label="Color"
                  name="color"
                  rules={[{ required: true, message: "Please enter color" }]}
                >
                  <Input placeholder="Red, Blue..." />
                </Form.Item>
              </Panel>

              {/* Fabric & Lace */}
              <Panel header="Fabric & Lace" key="3">
                <Form.Item
                  label="Fabric Type"
                  name="fabricType"
                  rules={[{ required: true, message: "Please enter fabric type" }]}
                >
                  <Input placeholder="Silk, Cotton, Georgette..." />
                </Form.Item>

                <Form.Item
                  label="Select Lace(s)"
                  name="laces"
                  rules={[{ required: true, message: "Please select at least one lace" }]}
                >
                  <Select mode="multiple" placeholder="Choose lace(s)" optionLabelProp="label">
                    {laces.map((lace) => (
                      <Option key={lace._id} value={lace._id} label={lace.name}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              lace.image.startsWith("http")
                                ? lace.image
                                : `http://localhost:5000/${lace.image}`
                            }
                            alt={lace.name}
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "cover",
                              marginRight: 10,
                              borderRadius: 6,
                            }}
                          />
                          <span>{lace.name}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Panel>
            </Collapse>

            <Form.Item style={{ marginTop: 20 }}>
              <Button type="primary" htmlType="submit" block>
                Add Blouse
              </Button>
            </Form.Item>
          </Form>
        </Col>

        {/* Right Side: Image Upload */}
        <Col xs={24} md={10}>
          <Card
            title="Upload Blouse Images (with labels)"
            bordered
            style={{ borderRadius: 12, background: "#fafafa" }}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              fileList={images.map((img, i) => ({
                uid: i,
                name: img.name || `image-${i}`,
                status: "done",
                url: img.url, // preview works
              }))}
              onChange={handleUpload}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>


            {images.map((img, index) => (
              <Form.Item key={index} label={`Label for Image ${index + 1}`}>
                <Input
                  placeholder="e.g. Front, Back, Sleeve"
                  value={img.label}
                  onChange={(e) => handleImageLabelChange(index, e.target.value)}
                />
              </Form.Item>
            ))}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Design;