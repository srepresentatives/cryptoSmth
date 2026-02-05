import { Layout, Spin } from "antd";
import { useContext } from "react";
import AppSider from "./AppSider.jsx";
import AppHeader from "./AppHeader.jsx";
import AppContent from "./AppContent.jsx";
import CryptoContext from "../../context/crypto-context.jsx";

function AppLayout() {
  const { loading } = useContext(CryptoContext);
  if (loading) {
    return <Spin fullscreen />
  }
  return(
  <Layout>
    <AppHeader />
    <Layout>
      <AppSider />
      <AppContent />
    </Layout>
  </Layout>
  );
}

export default AppLayout;