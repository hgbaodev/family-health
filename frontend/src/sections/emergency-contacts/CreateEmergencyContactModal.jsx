import { Button, Form, Input, Modal, message, Row, Col } from "antd";
import { useCreateEmergenceContact } from "~/api/emergency-contacts/create-emergencyContact";
import { useEmergencyContactStore } from "~/stores/emergencyContactStore";

const CreateEmergencyContactModal = () => {
    const [form] = Form.useForm();
    const { openCreateModal, setOpenCreateModal } = useEmergencyContactStore();

    const mutation = useCreateEmergenceContact({
        onSuccess: () => {
            form.resetFields();
            setOpenCreateModal(false);
            message.success("Emergency contact created successfully");
        },
        onError: () => {
            message.error("Failed to create emergency contact");
        },
    });

    const onFinish = (values) => {
        mutation.mutate(values);
    };

    return (
        <Modal
            title="Create Emergency Contact"
            open={openCreateModal}
            onCancel={() => setOpenCreateModal(false)}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                className="pt-4"
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={24}>
{/*                         <Form.Item */}
{/*                             label="User ID" */}
{/*                             name="userID" */}
{/*                             rules={[{ required: true, message: "Please enter userID" }]} */}
{/*                         > */}
{/*                             <Input placeholder="Enter userID..." /> */}
{/*                         </Form.Item> */}

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter the name of emergency contact" }]}
                        >
                            <Input placeholder="Enter name of Emergency Contact..." />
                        </Form.Item>

                        <Form.Item
                            label="Relationship"
                            name="relationship"
                            rules={[{ required: true, message: "Please enter relationship" }]}
                        >
                            <Input placeholder="Enter relationship..." />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: "Please enter phone number" },
                                { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
                            ]}
                        >
                            <Input placeholder="Enter phone number..." />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="pt-4 m-0">
                    <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
                        <Button
                            loading={false}
                            type="default"
                            htmlType="reset"
                            onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>

                        <Button
                            loading={false}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEmergencyContactModal;
