import { useMemo } from "react";
import { Button, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";


const useMemberColumns = () => {
    return useMemo(
        () => [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                align: "center",
            },
            {
                title: "Username",
                dataIndex: "username",
                key: "username",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Action",
                key: "action",
                render: () => (
                    <Space>
                        <Button icon={<EditOutlined />} />
                        <Button icon={<DeleteOutlined />} />
                    </Space>
                ),
            },
        ],
        []
    );
};

export default useMemberColumns;