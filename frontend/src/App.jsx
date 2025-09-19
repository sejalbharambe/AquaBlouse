import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Components/Sidebar"; // This will now behave like a top nav
import MainComponent from "./Components/MainComponent";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router> 
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout style={{ minHeight: "100vh", flexDirection: "column" }}>
                {/* Top Navigation (previous Sidebar component) */}
                <Header
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "65px",
                    zIndex: 100,
                    background: "#001529",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                    color: "#fff",
                  }}
                >
                  <Sidebar /> {/* Use your Sidebar component as top nav */}
                </Header>

                {/* Main Content */}
                <Content
                  style={{
                    // marginTop: "65px",
                    padding: "24px",
                    position: "fixed",
                    top: "65px",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflowY: "auto", // enables scrolling
                    background: "#fff",
                  }}
                >
                  <MainComponent />
                </Content>

                {/* Footer (optional) */}
                {/* <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
                  ©2024 StyleBay. All rights reserved.
                </Footer> */}
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
