import { Breadcrumb, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { SpaceProps } from "antd/es/space";

// Định nghĩa kiểu cho link
interface LinkItem {
  title: string;
  href?: string; // Có thể có hoặc không
}

// Định nghĩa kiểu cho các props của PageHeader
interface PageHeaderProps extends SpaceProps {
  heading: string;
  links: LinkItem[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ heading, links, ...props }) => {
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
