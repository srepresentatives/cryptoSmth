import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { capitalize } from "../../utils.js";
import { useContext } from "react";
import { useCrypto } from "../../context/crypto-context.jsx";


const siderStyle = {
  padding: "1rem",
};

function AppSider() {
  const { assets } = useCrypto();;
  
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <div key={asset.id}>
          <Card style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              styles={{ content: { color: asset.grow ? "#3f8600"  : "#cf1322"}}}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {title: 'total profit', value: asset.totalProfit, withTag: true},
                {title: 'asset amount', value: asset.amount, isPlain: true},
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                  {item.withTag && 
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  }
                  {item.isPlain && item.value}
                  {!item.isPlain && 
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                    }
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </div>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
