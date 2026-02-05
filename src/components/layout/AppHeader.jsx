import { Layout, Select, Button, Modal, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useCrypto } from "../../context/crypto-context";
import CoinInfoModal from "../CoinCryptoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  backgroundColor: "#fff",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === 'Slash') {
      setSelect((prev) => !prev);
    }
  };
  
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setSelect(false);
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        placeholder="press / to open"
        showSearch
        filterOption={(input, option) => {
          const search = (option?.searchLabel || option?.label || "")
            .toString()
            .toLowerCase();
          return search.includes(input.toLowerCase());
        }}
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: (
            <span style={{ display: "inline-flex" }}>
              <img
                src={coin.icon}
                alt={coin.name}
                style={{ width: 20, marginRight: 8 }}
              />
              {coin.name}
            </span>
          ),
          value: coin.id,
          key: coin.id,
          searchLabel: coin.name.toLowerCase(),
        }))}
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        size={600}
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
      
    </Layout.Header>
  );
}

export default AppHeader;
