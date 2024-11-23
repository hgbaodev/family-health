import { Button } from "antd";

const FooterButtons = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
      <Button type="default" htmlType="reset">
        Reset
      </Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </div>
  );
};

export default FooterButtons;
  