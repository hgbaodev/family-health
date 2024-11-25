import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Row, Col, message, Select } from "antd";
import { useUpdateHealthStat } from "~/api/health-stats/update-health-stat";
import { useHealthStatsStore } from "~/stores/healthStatStore";
import moment from "moment";

const UpdateHealthStatModal = () => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, healthStat } = useHealthStatsStore((state) => state);
  const [selectedStatType, setSelectedStatType] = useState("Blood Pressure");

  // Đồng bộ selectedStatType với healthStat khi healthStat thay đổi
  useEffect(() => {
    if (healthStat) {
      setSelectedStatType(healthStat.statType);
      form.setFieldsValue({
        ...healthStat,
        date: healthStat.date ? moment(healthStat.date) : null,
      });
    }
  }, [healthStat, form]);

  const mutation = useUpdateHealthStat({
    onSuccess: () => {
      form.resetFields();
      message.success("Health status updated successfully");
    },
    onError: () => {
      message.error("Failed to update health status");
    },
  });

  const handleChange = (value) => {
    setSelectedStatType(value);
  };

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      statType: selectedStatType,
      date: values.date ? values.date.format("YYYY-MM-DD HH:mm") : null,
    };
    mutation.mutate({
      id: healthStat.id,
      data: formattedValues,
    });
    setOpenUpdateModal(false);
  };

  const setPlaceholderOfStatValue = () => {
    switch (selectedStatType) {
      case "Blood Pressure":
        return "mmHg";
      case "Blood Glucose":
        return "mg/dL";
      case "Heart Rate":
        return "bpm";
      default:
        return "";
    }
  };

  return (
    <Modal
      title="Update Health Status"
      open={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status type" name="statType">
              <Select
                value={selectedStatType} // Sử dụng value để đồng bộ với selectedStatType
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={[
                  { value: "Blood Pressure", label: "Blood Pressure" },
                  { value: "Blood Glucose", label: "Blood Glucose" },
                  { value: "Heart Rate", label: "Heart Rate" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status Value"
              name="statValue"
              rules={[{ required: true, message: "Please enter status value" }]}
            >
              <Input
                placeholder={setPlaceholderOfStatValue()}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.keyCode !== 8 && e.keyCode !== 46) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Date and time"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker
                showTime
                placeholder="Select the date and time of measurement."
                style={{ width: "100%" }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateHealthStatModal;
