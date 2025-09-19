import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SkinOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Routes mapping
  const routes = [
    { key: "/", label: "Home", icon: <HomeOutlined /> },
    {
      key: "/designs",
      label: "Designs",
      icon: <AppstoreOutlined />,
      children: [
        { key: "/designs", label: "Blouse Designs" },
        { key: "/laces", label: "Laces" },
      ],
    },
    { key: "/blouses", label: "Blouses", icon: <SkinOutlined /> },
    { key: "/customise", label: "Customise", icon: <EditOutlined /> },
    { key: "/profile", label: "Profile", icon: <UserOutlined /> },
  ];

  // Determine the active key from current path
  const activeKey =
    routes
      .flatMap((r) => [r, ...(r.children || [])])
      .find(
        (r) =>
          location.pathname === r.key ||
          location.pathname.startsWith(r.key + "/")
      )?.key || "/";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: "#fff",
          marginRight: 40,
          letterSpacing: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        StyleBay
      </div>

      {/* Top Menu */}
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[activeKey]}
        onClick={({ key }) => navigate(key)}
        items={routes.map((r) => ({
          key: r.key,
          icon: r.icon,
          label: r.label,
          children: r.children, // add submenu
        }))}
        style={{
          flex: 1,
          minWidth: 0,
          borderBottom: "none",
        }}
      />
    </div>
  );
};

export default Sidebar;
