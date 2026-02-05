import { useState, useRef } from "react";
import {
  Select,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added successfully!"
        subTitle={`Added ${assetRef.current?.amount} of ${assetRef.current?.id} by price ${assetRef.current?.price} to your portfolio.`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        open={select}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        onClick={() => setSelect((prev) => !prev)}
        placeholder="Select a coin"
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
    );
  }

  function onFinish(values) {
    console.log("Form values:", values);
    const newAsset = {
      id: coin.id,
      amount: +values.amount,
      price: +values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
