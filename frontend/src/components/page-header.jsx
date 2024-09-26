import { Breadcrumb, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const PageHeader = ({ heading, links, ...props }) => {
  const breadcrumbItems = links.map((link) => {
    if (link.href) {
      return {
        title: <Link to={link.href}>{link.title}</Link>,
      };
    }
    return {
      title: link.title,
    };
  });

  return (
    <Space direction="vertical" size="small" {...props}>
      <Typography.Title level={4} className="!mb-0">
        {heading}
      </Typography.Title>
      <Breadcrumb items={breadcrumbItems} />
    </Space>
  );
};

export default PageHeader;
